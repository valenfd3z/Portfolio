document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".auth-form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");
    const preguntas = [
        document.getElementById("pregunta1"),
        document.getElementById("pregunta2"),
        document.getElementById("pregunta3")
    ];
    const errorDiv = document.createElement("div");
    errorDiv.className = "form-error";
    form.insertBefore(errorDiv, form.firstChild);

    // Lista de preguntas disponibles
    const PREGUNTAS_DISPOBILES = [
        "¿Cuál es el nombre de tu primera mascota?",
        "¿En qué ciudad naciste?",
        "¿Cuál es el nombre de tu escuela primaria?",
        "¿Cuál es el nombre de tu mejor amigo de la infancia?",
        "¿Cuál es tu color favorito?",
        "¿Cuál es tu comida favorita?",
        "¿Cuál es el nombre de tu abuelo paterno?",
        "¿Cuál es tu libro favorito?"
    ];

    // Función utilitaria para crear opciones del select
    function crearOpciones(preguntas) {
        return preguntas.map(pregunta => {
            const option = document.createElement("option");
            option.value = pregunta;
            option.textContent = pregunta;
            return option;
        });
    }

    // Actualizar las preguntas disponibles en un select
    function actualizarSelect(select, preguntasSeleccionadas) {
        // Limpiar y actualizar select
        select.innerHTML = "<option value=\"\">Selecciona una pregunta</option>";
        select.appendChild(...crearOpciones(PREGUNTAS_DISPOBILES));
        
        // Deshabilitar las preguntas que ya han sido seleccionadas en otros campos
        preguntasSeleccionadas.forEach((pregunta, index) => {
            if (pregunta && index !== select.dataset.index) {
                const option = select.querySelector(`option[value="${pregunta}"]`);
                if (option) {
                    option.disabled = true;
                    option.style.color = '#999';
                }
            }
        });
        
        // Restaurar selección si existe
        if (select.value) {
            select.value = preguntasSeleccionadas[select.dataset.index];
        }
    }

    // Función principal para actualizar todos los selects
    function actualizarPreguntas() {
        const preguntasSeleccionadas = preguntas.map(select => select.value);
        preguntas.forEach((select, index) => {
            select.dataset.index = index;
            actualizarSelect(select, preguntasSeleccionadas);
        });
    }

    // Event listener para cambios en preguntas
    preguntas.forEach(select => {
        select.addEventListener("change", actualizarPreguntas);
    });

    // Actualizar preguntas al inicio
    actualizarPreguntas();

    // Validación del formulario
    form.addEventListener("submit", function (e) {
        // Validar contraseñas
        if (password.value !== confirmPassword.value) {
            e.preventDefault();
            alert("Las contraseñas no coinciden");
            return;
        }

        // Validar preguntas únicas
        const preguntasSeleccionadas = preguntas.map(select => select.value);
        if (new Set(preguntasSeleccionadas).size !== preguntasSeleccionadas.length) {
            e.preventDefault();
            errorDiv.textContent = "Debes seleccionar 3 preguntas diferentes";
            errorDiv.style.display = "block";
            return;
        }
    });
});