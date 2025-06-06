from typing import List, Tuple

SECURITY_QUESTIONS = [
    "¿Cuál es el nombre de tu primera mascota?",
    "¿En qué ciudad naciste?",
    "¿Cuál es el nombre de tu escuela primaria?",
    "¿Cuál es el nombre de tu mejor amigo de la infancia?",
    "¿Cuál es tu color favorito?",
    "¿Cuál es tu comida favorita?",
    "¿Cuál es el nombre de tu abuelo paterno?",
    "¿Cuál es tu libro favorito?"
]

def get_security_questions():
    """Obtiene la lista de preguntas de seguridad disponibles"""
    return SECURITY_QUESTIONS

def get_available_questions(selected=[]):
    """Obtiene preguntas disponibles excluyendo las ya seleccionadas"""
    return [q for q in SECURITY_QUESTIONS if q not in selected]

def validate_unique_questions(questions: List[str], selected: List[str] = None) -> Tuple[bool, str]:
    """
    Valida que las preguntas sean únicas y válidas.
    
    Args:
        questions: Lista de preguntas seleccionadas
        selected: Lista de preguntas ya seleccionadas (opcional)
        
    Returns:
        tuple: (bool, str) - Validación y mensaje de error si existe
    """
    # Verificar cantidad correcta
    if len(questions) != 3:
        return False, 'Debe seleccionar exactamente 3 preguntas'
    
    # Verificar unicidad
    if len(set(questions)) != 3:
        return False, 'Las preguntas deben ser diferentes'
    
    # Verificar validez
    valid_questions = get_security_questions()
    if not all(q in valid_questions for q in questions):
        return False, 'Alguna de las preguntas no es válida'
    
    # Verificar no repetición con preguntas seleccionadas previamente
    if selected and any(q in selected for q in questions):
        return False, 'No puedes seleccionar preguntas que ya hayas usado'
    
    return True, None

def get_available_questions(selected: List[str]) -> List[str]:
    """
    Obtiene las preguntas disponibles para seleccionar.
    
    Args:
        selected: Lista de preguntas ya seleccionadas
        
    Returns:
        list: Lista de preguntas disponibles
    """
    all_questions = get_security_questions()
    return [q for q in all_questions if q not in selected]

def preprocess_response(response: str) -> str:
    """Preprocesa una respuesta para comparación."""
    return response.lower().strip() if response else ''
