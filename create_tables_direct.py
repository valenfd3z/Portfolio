from flask_sqlalchemy import SQLAlchemy
from app.models import ejercicio, usuario

db = SQLAlchemy()

def create_tables():
    # Configuración de la base de datos
    config = {
        'SQLALCHEMY_DATABASE_URI': 'postgresql://cybercoach_db_lib6_user:DPcnVLgMbHGbKRjFYw4wpB02mBCnvC7y@dpg-d1129uemcj7s739pct7g-a.oregon-postgres.render.com/cybercoach_db_lib6',
        'SQLALCHEMY_TRACK_MODIFICATIONS': False
    }
    
    # Crear aplicación temporal
    app = Flask(__name__)
    app.config.update(config)
    
    # Inicializar la base de datos
    db.init_app(app)
    
    with app.app_context():
        # Crear todas las tablas
        db.create_all()
        print("Tablas creadas exitosamente!")

if __name__ == '__main__':
    from flask import Flask
    create_tables()
