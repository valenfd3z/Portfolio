from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.exc import SQLAlchemyError
import logging

# Configuración de logging
logger = logging.getLogger(__name__)

db = SQLAlchemy()

def init_db(app):
    """
    Inicializa la base de datos con la aplicación Flask
    
    Args:
        app (Flask): La aplicación Flask a la que conectar la base de datos
    
    Returns:
        SQLAlchemy: Instancia de SQLAlchemy configurada
    
    Raises:
        SQLAlchemyError: Si hay problemas con la conexión a la base de datos
    """
    try:
        db.init_app(app)
        
        # Configurar eventos de SQLAlchemy para PostgreSQL
        @event.listens_for(Engine, "connect")
        def set_postgresql_settings(dbapi_connection, connection_record):
            cursor = dbapi_connection.cursor()
            cursor.execute("SET client_encoding = 'UTF8';")
            cursor.close()
        
        # Configurar eventos de limpieza de sesión
        def configure_session_cleanup():
            @event.listens_for(db.engine, 'before_cursor_execute')
            def before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
                """Limpia la sesión antes de cada consulta"""
                try:
                    db.session.expire_all()
                    logger.debug(f"Limpiando sesión antes de ejecutar: {statement}")
                except SQLAlchemyError as e:
                    logger.error(f"Error al limpiar sesión: {str(e)}")
                    raise
        
        # Configurar limpieza de sesión después de inicializar la base de datos
        with app.app_context():
            configure_session_cleanup()
        
        logger.info("Base de datos inicializada correctamente")
        return db
        
    except SQLAlchemyError as e:
        logger.error(f"Error al inicializar la base de datos: {str(e)}")
        raise

# Funciones de ayuda para manejo de sesiones
def commit_session():
    """Comitea la sesión actual de la base de datos"""
    try:
        db.session.commit()
        logger.info("Transacción commitada exitosamente")
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Error al commitar transacción: {str(e)}")
        raise

def rollback_session():
    """Hace rollback de la sesión actual"""
    try:
        db.session.rollback()
        logger.info("Rollback realizado exitosamente")
    except SQLAlchemyError as e:
        logger.error(f"Error al hacer rollback: {str(e)}")
        raise