from app import create_app
from app.database import db
from app.models import ejercicio, usuario

app = create_app()

with app.app_context():
    # Crear todas las tablas
    db.create_all()
    print("Tablas creadas exitosamente!")
