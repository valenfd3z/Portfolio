from ..database import db

class Ejercicio(db.Model):
    __tablename__ = 'ejercicio'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    video_url = db.Column(db.String(255))
    musculo = db.Column(db.String(120), nullable=False)

    def __init__(self, nombre, video_url, musculo):
        self.nombre = nombre
        self.video_url = video_url
        self.musculo = musculo

    def __repr__(self):
        return f'<Ejercicio {self.nombre}>'