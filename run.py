# run.py
# Archivo de ejecución principal de la aplicación

import os
from dotenv import load_dotenv
from app import create_app, db

# Configuración inicial
load_dotenv()

if __name__ == '__main__':
    # Crear y configurar la aplicación
    app = create_app()
    
    # Configurar middleware de protección contra SQL Injection
    from app.middleware import protect_against_sql_injection
    app.before_request(protect_against_sql_injection)
    
    # Crear todas las tablas en la base de datos
    with app.app_context():
        from app.models import ejercicio, usuario  # Importar todos los modelos
        db.create_all()
    
    # Configurar servidor para Render
    debug_mode = os.getenv('FLASK_ENV', 'development') == 'development'
    host = os.getenv('APP_HOST', '0.0.0.0')
    port = int(os.getenv('APP_PORT', 8080))

    # Iniciar servidor
    app.run(
        host=host,
        port=port,
        debug=debug_mode,
        use_reloader=debug_mode
    )