from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .usuario import Usuario
from .ejercicio import Ejercicio