from .main import main_bp
from .auth import auth_bp
from .ejercicios import ejercicios_bp
import logging

logger = logging.getLogger(__name__)

def init_app(app):
    """
    Inicializa los blueprints
    
    Args:
        app: La aplicación Flask
    """
    try:
        # Registrar blueprints
        app.register_blueprint(main_bp)
        app.register_blueprint(auth_bp)
        app.register_blueprint(ejercicios_bp)
        
        logger.info("Blueprints configurados")
        
    except Exception as e:
        logger.error(f"Error al inicializar rutas: {str(e)}")
        raise