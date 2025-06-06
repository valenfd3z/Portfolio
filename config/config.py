import os
from dotenv import load_dotenv

load_dotenv()

# Configuración base
class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configuración de la base de datos
    DB_CONFIG = {
        'usuario': os.getenv('DB_USUARIO', 'postgres'),
        'contrasena': os.getenv('DB_CONTRASEÑA'),
        'host': os.getenv('DB_HOST', 'localhost'),
        'puerto': os.getenv('DB_PUERTO', '5432'),
        'nombre': os.getenv('DB_NOMBRE', 'cybercoach_db')
    }
    
    SQLALCHEMY_DATABASE_URI = (
        f'postgresql://{DB_CONFIG["usuario"]}:{DB_CONFIG["contrasena"]}'
        f'@{DB_CONFIG["host"]}:{DB_CONFIG["puerto"]}/{DB_CONFIG["nombre"]}'
    )

# Configuración de entorno
def get_config():
    env = os.getenv('FLASK_ENV', 'development')
    if env == 'production':
        return ProductionConfig
    elif env == 'testing':
        return TestingConfig
    return DevelopmentConfig
