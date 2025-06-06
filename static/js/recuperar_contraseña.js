document.addEventListener("DOMContentLoaded", function () {
    const preguntasForm = document.getElementById("preguntasForm");
    
    // Manejar animaciones de entrada
    function animarEntrada() {
        const formGroups = preguntasForm.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            setTimeout(() => {
                group.classList.add('visible');
            }, index * 100); // Delay incremental para cada grupo
        });
    }

    // Validar que todas las respuestas estén completas
    function validarRespuestas() {
        const respuestas = ['respuesta1', 'respuesta2', 'respuesta3'];
        return respuestas.every(respuesta => {
            const input = document.getElementById(respuesta);
            return input && input.value.trim() !== '';
        });
    }

    // Validación del formulario de preguntas
    preguntasForm.addEventListener("submit", function (e) {
        if (!validarRespuestas()) {
            e.preventDefault();
            const errorDiv = document.createElement("div");
            errorDiv.className = "form-error";
            preguntasForm.insertBefore(errorDiv, preguntasForm.firstChild);
            errorDiv.textContent = "Por favor, completa todas las respuestas";
            errorDiv.style.display = "block";
            return;
        }

        // Remover cualquier error anterior
        const errorDiv = preguntasForm.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    });

    // Verificar si hay preguntas disponibles al cargar la página
    const preguntas = preguntasForm.querySelectorAll('.pregunta-texto');
    if (preguntas.length > 0 && preguntas[0].textContent !== '(Ingresa tu correo electrónico para ver tus preguntas)') {
        preguntasForm.style.display = 'block';
        animarEntrada();
    }
});
