from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify, flash
from app.security import hash_password, verify_password
from app.models.usuario import Usuario
from app.database import db
from app.utils.security_questions import (
    get_security_questions, validate_unique_questions, 
    get_available_questions, preprocess_response
)

auth_bp = Blueprint('auth', __name__)

# Importar funciones de seguridad
from app.utils.security_questions import get_security_questions, validate_unique_questions

@auth_bp.route('/validar-preguntas', methods=['POST'])
def validar_preguntas():
    """Valida las preguntas de seguridad seleccionadas"""
    preguntas = request.json.get('preguntas', [])
    valido, error = validate_unique_questions(
        preguntas,
        session.get('preguntas_seleccionadas', [])
    )
    
    if not valido:
        return jsonify({'error': error}), 400
    
    session['preguntas_seleccionadas'] = preguntas
    return jsonify({'valido': True})

@auth_bp.route('/registrar', methods=['GET', 'POST'])
def registrar_usuario():
    # Limpiar sesión si ya existe
    session.pop('user_id', None)
    session.pop('nombre_usuario', None)
    session.pop('preguntas_seleccionadas', None)
    
    if request.method == 'POST':
        try:
            # Obtener datos del formulario
            datos = request.form
            
            # Validaciones básicas
            campos_requeridos = ['email', 'username', 'password', 'confirm_password']
            if not all(datos.get(campo) for campo in campos_requeridos):
                return render_template('registro.html', 
                                    error='Todos los campos son requeridos.',
                                    email=datos.get('email', ''),
                                    username=datos.get('username', ''))

            # Validar contraseñas
            if datos['password'] != datos['confirm_password']:
                return render_template('registro.html', 
                                    error='Las contraseñas no coinciden.',
                                    email=datos.get('email', ''),
                                    username=datos.get('username', ''))

            # Verificar si el usuario ya existe
            if Usuario.query.filter_by(nombre_usuario=datos['username']).first():
                return render_template('registro.html', 
                                    error='El nombre de usuario ya existe.',
                                    email=datos.get('email', ''))

            if Usuario.query.filter_by(gmail=datos['email']).first():
                return render_template('registro.html', 
                                    error='El correo electrónico ya está registrado.',
                                    username=datos.get('username', ''))

            # Validar preguntas de seguridad
            preguntas = [datos[f'pregunta{i}'] for i in range(1, 4)]
            respuestas = [datos[f'respuesta{i}'] for i in range(1, 4)]
            
            # Validar que las preguntas sean únicas y existan
            preguntas_disponibles = get_security_questions()
            for pregunta in preguntas:
                if pregunta not in preguntas_disponibles:
                    return render_template('registro.html', 
                                        error='Una de las preguntas seleccionadas no es válida.',
                                        email=datos.get('email', ''),
                                        username=datos.get('username', ''))
            
            if len(set(preguntas)) != 3:  # Verificar que sean 3 preguntas únicas
                return render_template('registro.html', 
                                    error='Debes seleccionar 3 preguntas de seguridad diferentes.',
                                    email=datos.get('email', ''),
                                    username=datos.get('username', ''))

            # Crear nuevo usuario
            try:
                nuevo_usuario = Usuario(
                    gmail=datos['email'],
                    nombre_usuario=datos['username'],
                    contrasena=hash_password(datos['password']),
                    pregunta1=preguntas[0], respuesta1=preprocess_response(respuestas[0]),
                    pregunta2=preguntas[1], respuesta2=preprocess_response(respuestas[1]),
                    pregunta3=preguntas[2], respuesta3=preprocess_response(respuestas[2])
                )
                db.session.add(nuevo_usuario)
                db.session.commit()
                
                # Limpiar la sesión completamente
                session.pop('user_id', None)
                session.pop('nombre_usuario', None)
                session.pop('preguntas_seleccionadas', None)
                
                return redirect(url_for('.iniciar_sesion'))
            except Exception as e:
                db.session.rollback()
                logger.error(f"Error al crear usuario: {str(e)}")
                return render_template('registro.html', 
                                    error='Error al crear la cuenta. Por favor intenta nuevamente.',
                                    email=datos.get('email', ''),
                                    username=datos.get('username', ''))

        except Exception as e:
            logger.error(f"Error en el registro: {str(e)}")
            return render_template('registro.html', 
                                error='Error en el registro. Por favor intenta nuevamente.',
                                email=request.form.get('email', ''),
                                username=request.form.get('username', ''))

    # Inicializar sesión si es necesario
    if 'preguntas_seleccionadas' not in session:
        session['preguntas_seleccionadas'] = []
    
    return render_template('registro.html')

@auth_bp.route('/iniciar_sesion', methods=['GET', 'POST'])
def iniciar_sesion():
    """Endpoint para inicio de sesión"""
    # Limpiar sesión si ya existe
    session.pop('user_id', None)
    session.pop('nombre_usuario', None)
    
    if request.method == 'POST':
        usuario = Usuario.query.filter_by(nombre_usuario=request.form['username']).first()
        if usuario and verify_password(usuario.contrasena, request.form['password']):
            session['user_id'] = usuario.id
            session['nombre_usuario'] = usuario.nombre_usuario
            return redirect(url_for('main.pagina_principal'))
        return render_template('login.html', error='Credenciales inválidas.')
    return render_template('login.html')

@auth_bp.route('/cerrar_sesion')
def cerrar_sesion():
    """Endpoint para cerrar sesión"""
    session.pop('user_id', None)
    session.pop('nombre_usuario', None)
    return redirect(url_for('main.pagina_principal'))

@auth_bp.route('/cambiar_contraseña', methods=['GET', 'POST'])
def cambiar_contraseña():
    """Endpoint para cambiar la contraseña después de validar identidad"""
    try:
        # Verificar que no haya sesión activa (nombre_usuario indica sesión activa)
        if 'nombre_usuario' in session:
            return redirect(url_for('main.pagina_principal'))

        # Verificar que haya un email en sesión
        if 'email' not in session:
            return redirect(url_for('auth.recuperar_contraseña'))

        # Verificar que haya un user_id en sesión
        if 'user_id' not in session:
            return render_template('cambiar_contraseña.html', error='Error: Sesión inválida. Por favor, intenta nuevamente.')

        if request.method == 'POST':
            nueva_contraseña = request.form.get('nueva_contraseña')
            confirmar_contraseña = request.form.get('confirmar_contraseña')

            if not nueva_contraseña or not confirmar_contraseña:
                return render_template('cambiar_contraseña.html', error='Por favor, completa todos los campos.')

            if nueva_contraseña != confirmar_contraseña:
                return render_template('cambiar_contraseña.html', error='Las contraseñas no coinciden.')

            # Verificar que la contraseña tenga al menos 6 caracteres
            if len(nueva_contraseña) < 6:
                return render_template('cambiar_contraseña.html', error='La contraseña debe tener al menos 6 caracteres.')

            # Actualizar contraseña
            usuario = Usuario.query.get(session['user_id'])
            if not usuario:
                return render_template('cambiar_contraseña.html', error='Error: Usuario no encontrado.')

            usuario.contrasena = hash_password(nueva_contraseña)
            db.session.commit()

            # Limpiar la sesión después de cambiar la contraseña
            session.pop('email', None)
            session.pop('user_id', None)

            return redirect(url_for('auth.iniciar_sesion', mensaje='Contraseña cambiada exitosamente'))

        return render_template('cambiar_contraseña.html')

    except Exception as e:
        print(f"Error en cambiar_contraseña: {str(e)}")
        return render_template('cambiar_contraseña.html', error='Error al cambiar la contraseña. Por favor intenta nuevamente.')

@auth_bp.route('/recuperar_contraseña', methods=['GET', 'POST'])
def recuperar_contraseña():
    """Endpoint para recuperar contraseña"""
    try:
        if request.method == 'GET':
            email = request.args.get('email')
            
            if email:
                usuario = Usuario.query.filter_by(gmail=email).first()
                if usuario:
                    preguntas = [
                        usuario.pregunta1,
                        usuario.pregunta2,
                        usuario.pregunta3
                    ]
                    return render_template('recuperar_contraseña.html', 
                                        preguntas=preguntas,
                                        email=email)
                return render_template('recuperar_contraseña.html', 
                                    error='No se encontró un usuario con ese correo electrónico.')
            
            return render_template('recuperar_contraseña.html')
        
        datos = request.form
        print(f"Datos recibidos en POST: {datos}")  # Debug
        
        campos_requeridos = ['email', 'respuesta1', 'respuesta2', 'respuesta3']
        if not all(campo in datos for campo in campos_requeridos):
            return render_template('recuperar_contraseña.html', 
                                error='Por favor, completa todos los campos del formulario.')

        usuario = Usuario.query.filter_by(gmail=datos['email']).first()
        if not usuario:
            return render_template('recuperar_contraseña.html', 
                                error='No se encontró un usuario con ese correo electrónico.',
                                email=datos['email'])

        # Verificar respuestas a las preguntas de seguridad
        respuestas_correctas = [
            preprocess_response(usuario.respuesta1) == preprocess_response(datos['respuesta1']),
            preprocess_response(usuario.respuesta2) == preprocess_response(datos['respuesta2']),
            preprocess_response(usuario.respuesta3) == preprocess_response(datos['respuesta3'])
        ]

        if not all(respuestas_correctas):
            errores = []
            for i, correcta in enumerate(respuestas_correctas, 1):
                if not correcta:
                    errores.append(f"Pregunta {i}")
            
            error_msg = f"Las respuestas a las preguntas de seguridad son incorrectas: {', '.join(errores)}"
            return render_template('recuperar_contraseña.html', 
                                error=error_msg,
                                email=datos['email'],
                                preguntas=[
                                    usuario.pregunta1,
                                    usuario.pregunta2,
                                    usuario.pregunta3
                                ])

        # Guardar el correo electrónico en la sesión
        session['email'] = datos['email']
        session['user_id'] = usuario.id

        # Redirigir a la página de cambiar contraseña
        return redirect(url_for('auth.cambiar_contraseña'))

    except Exception as e:
        print(f"Error en recuperar_contraseña: {str(e)}")
        return render_template('recuperar_contraseña.html', 
                            error='Error al recuperar la contraseña. Por favor intenta nuevamente.')