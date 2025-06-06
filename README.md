# CyberCoach

Aplicación web para entrenamiento y seguimiento de rutinas de ejercicios.

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd cybercoach
```

2. Crear y activar un entorno virtual:
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Configurar variables de entorno:

1. Copia el contenido del archivo `.env.example` al archivo `.env`:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` y reemplaza los valores con los reales:
- Genera una nueva clave Fernet para producción
- Configura las credenciales de la base de datos
- Configura las credenciales de correo si es necesario

**Importante: Nunca subas el archivo `.env` a control de versiones**.

Para producción, considera:
- Usar variables de entorno del sistema operativo
- Usar un servicio de secretos (como AWS Secrets Manager, Azure Key Vault, etc.)
- Usar variables de entorno del servicio de despliegue (Heroku, DigitalOcean, etc.)

**Nunca incluir en el .env:**
- Contraseñas de producción
- Claves API
- Credenciales sensibles
- Información de tarjetas de crédito
- Información personal sensible

```
# Ejemplo de .env para desarrollo
FLASK_ENV=development
FERNET_KEY=tu_clave_fernet_aqui
DB_USUARIO=postgres
DB_HOST=localhost
DB_PUERTO=5432
DB_NOMBRE=cybercoach_db
```

## Ejecución

Para ejecutar la aplicación en modo desarrollo:
```bash
python run.py
```

La aplicación estará disponible en `http://localhost:5000`

## Estructura del Proyecto

```
cybercoach/
├── app/              # Código principal de la aplicación
│   ├── __init__.py
│   ├── database.py   # Configuración de la base de datos
│   ├── models.py     # Modelos de datos
│   └── middleware/   # Middleware de la aplicación
├── config/           # Configuración de la aplicación
│   └── config.py     # Configuraciones por entorno
├── static/           # Archivos estáticos (CSS, JS, imágenes)
├── templates/        # Templates HTML
├── run.py            # Punto de entrada de la aplicación
├── requirements.txt  # Dependencias del proyecto
└── README.md         # Documentación del proyecto
```

## Variables de Entorno

- `FLASK_ENV`: Entorno de ejecución (development, production, testing)
- `SECRET_KEY`: Clave secreta para la aplicación
- `DB_USUARIO`: Usuario de la base de datos
- `DB_CONTRASEÑA`: Contraseña de la base de datos
- `DB_HOST`: Host de la base de datos
- `DB_PUERTO`: Puerto de la base de datos
- `DB_NOMBRE`: Nombre de la base de datos
