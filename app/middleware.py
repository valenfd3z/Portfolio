from flask import request
from .security import is_sql_injection_safe

def protect_against_sql_injection():
    """
    Middleware que verifica entradas contra SQL Injection
    """
    try:
        if request.endpoint in ['auth.recuperar_contraseña', 'auth.cambiar_contraseña']:
            return None

        def check_input(value):
            return isinstance(value, str) and not is_sql_injection_safe(value)

        # Verificar parámetros GET
        if any(check_input(str(v)) for v in request.args.values()):
            return "Entrada no válida. Caracteres especiales no permitidos.", 400

        # Verificar parámetros POST
        if request.method == 'POST':
            if request.form and any(check_input(str(v)) for v in request.form.values()):
                return "Entrada no válida. Caracteres especiales no permitidos.", 400
            
            if request.is_json:
                if any(check_input(v) for v in request.json.values() if isinstance(v, str)):
                    return "Entrada no válida. Caracteres especiales no permitidos.", 400
    except Exception:
        return "Error interno del servidor", 500
