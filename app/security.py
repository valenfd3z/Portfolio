from werkzeug.security import generate_password_hash, check_password_hash
import re

def is_sql_injection_safe(input_str: str) -> bool:
    """Verifica si una cadena es segura contra inyección SQL."""
    patterns = [
        r'\b(select|update|delete|insert|drop|alter)\b.*?\bfrom\b',
        r'\b OR \b.*?\b1=1\b',
        r'\b AND \b.*?\b1=1\b',
        r'--.*',
        r'/\*.*\*/'
    ]
    return not any(re.search(p, input_str.lower(), re.IGNORECASE) for p in patterns)

def hash_password(password: str) -> str:
    """Genera un hash para la contraseña."""
    return generate_password_hash(password)

def verify_password(stored_password: str, provided_password: str) -> bool:
    """Verifica si la contraseña proporcionada coincide con el hash almacenado."""
    return check_password_hash(stored_password, provided_password)
