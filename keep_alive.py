import requests
import time
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# URL base de la aplicación
BASE_URL = os.getenv('BASE_URL', 'https://cybercoach.onrender.com')

# Función para mantener la aplicación activa
def keep_alive():
    while True:
        try:
            # Realizar una petición GET a la página principal
            response = requests.get(BASE_URL)
            print(f"Peticion realizada - Status: {response.status_code}")
        except Exception as e:
            print(f"Error: {str(e)}")
        
        # Esperar 12 segundos antes de la siguiente petición
        time.sleep(12)

if __name__ == '__main__':
    print("Iniciando script keep_alive...")
    keep_alive()
