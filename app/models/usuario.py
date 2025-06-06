from app.database import db
from app.security import hash_password, verify_password

# Modelo de Usuario que representa a los usuarios de la aplicación
class Usuario(db.Model):
    __tablename__ = 'usuario'
    
    id = db.Column(db.Integer, primary_key=True)
    gmail = db.Column(db.String(255), unique=True, nullable=False)
    nombre_usuario = db.Column(db.String(120), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)
    pregunta1 = db.Column(db.String(255))
    respuesta1 = db.Column(db.String(255))
    pregunta2 = db.Column(db.String(255))
    respuesta2 = db.Column(db.String(255))
    pregunta3 = db.Column(db.String(255))
    respuesta3 = db.Column(db.String(255))

    def __init__(self, gmail, nombre_usuario, contrasena, pregunta1=None, respuesta1=None, pregunta2=None, respuesta2=None, pregunta3=None, respuesta3=None):
        self.gmail = gmail
        self.nombre_usuario = nombre_usuario
        self.contrasena = contrasena
        self.pregunta1 = pregunta1
        self.respuesta1 = respuesta1
        self.pregunta2 = pregunta2
        self.respuesta2 = respuesta2
        self.pregunta3 = pregunta3
        self.respuesta3 = respuesta3

    def __repr__(self):
        return f'<Usuario {self.nombre_usuario}>'