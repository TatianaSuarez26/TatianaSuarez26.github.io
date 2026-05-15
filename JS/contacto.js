// CONFIRMACIÓN AL ENVIAR EL FORMULARIO DE CONTACTO

// Obtengo el formulario de contacto del DOM
const formContacto = document.getElementById("form-contacto");

formContacto.addEventListener("submit", (e) => {
    // Evito que el formulario recargue la página al enviarse
    e.preventDefault();

    // Leo el nombre que escribió el usuario para personalizarle el mensaje
    const nombre = document.getElementById("nombre").value.trim();

    // Inserto el nombre dentro del mensaje de confirmación
    document.getElementById("nombre-contacto").textContent = nombre;

    // Oculto el formulario y muestro el mensaje de confirmación
    formContacto.style.display = "none";
    document.getElementById("confirmacion-contacto").style.display = "flex";
});
