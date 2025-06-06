# config.py
# Archivo de configuración de la aplicación
# Contiene todas las configuraciones necesarias para la aplicación

import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
# Esto permite mantener las credenciales fuera del código
load_dotenv()

class Config:
    """
    Clase que contiene toda la configuración de la aplicación
    
    Atributos:
        SECRET_KEY: Clave secreta para la aplicación
        DB_CONFIG: Configuración de la base de datos PostgreSQL
        SQLALCHEMY_DATABASE_URI: URI de conexión a la base de datos
        SQLALCHEMY_TRACK_MODIFICATIONS: Configuración de SQLAlchemy
    """
    
    # Clave secreta para la aplicación
    # Se obtiene del archivo .env o usa un valor por defecto
    SECRET_KEY = os.getenv('SECRET_KEY', 'clave-secreta-por-defecto')
    
    # Configuración de la base de datos PostgreSQL
    # Usar la URL de Render directamente
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://cybercoach_db_lib6_user:DPcnVLgMbHGbKRjFYw4wpB02mBCnvC7y@dpg-d1129uemcj7s739pct7g-a.oregon-postgres.render.com/cybercoach_db_lib6')
    
    # Configuración de SQLAlchemy
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 10,
        'pool_recycle': 1800,  # 30 minutos
        'pool_timeout': 30
    }
    
    # Configuración de SQLAlchemy
    # Desactiva el tracking de modificaciones para mejorar el rendimiento
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Configuración de sesión
    PERMANENT_SESSION_LIFETIME = 1200  # 20 minutos en segundos
    SESSION_COOKIE_SECURE = True  # Solo permitir cookies sobre HTTPS en producción
    SESSION_COOKIE_HTTPONLY = True  # Mejora la seguridad de las cookies