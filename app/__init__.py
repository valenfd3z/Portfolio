# __init__.py
# Archivo de inicialización de la aplicación Flask
# Contiene la configuración y setup inicial de la aplicación

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from .routes import init_app as init_routes
from .database import db, init_db
import logging

# Configurar logging
logger = logging.getLogger(__name__)

def create_app():
    """
    Función que crea y configura la aplicación Flask
    
    Returns:
        Flask: La aplicación configurada y lista para usar
    
    Raises:
        Exception: Si hay problemas en la inicialización
    """
    try:
        # Crear la aplicación Flask
        app = Flask(__name__, 
                    template_folder='../templates',
                    static_folder='../static')
        
        # Cargar la configuración desde el archivo config.py
        app.config.from_object(Config)
        
        # Inicializar la base de datos con la aplicación
        init_db(app)
        logger.info("Base de datos inicializada correctamente")
        
        # La base de datos ya está inicializada en init_db, no necesitamos crear otra instancia
        app.db = db  # Usamos la instancia existente

        # Asegurarse de que la base de datos esté inicializada antes de registrar rutas
        with app.app_context():
            db.create_all()
            logger.info("Tablas de la base de datos creadas")
            
        # Registrar los blueprints
        init_routes(app)
        logger.info("Rutas registradas exitosamente")
        
        # Asegurar que la base de datos esté disponible en todas las rutas
        @app.before_request
        def before_request():
            db.session.begin()
            logger.debug("Sesión de base de datos iniciada")

        return app
        
    except Exception as e:
        logger.error(f"Error al crear la aplicación: {str(e)}")
        raise

# Exportar el objeto db para que sea accesible desde otros módulos
__all__ = ['create_app', 'db']
