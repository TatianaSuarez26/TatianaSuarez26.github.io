// CONFIRMACIÓN AL ENVIAR EL FORMULARIO DE CONTACTO

const formContacto = document.getElementById("form-contacto");

formContacto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();

    // Validación de formato de correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        alert("Por favor ingresa un correo electrónico válido.");
        return;
    }

    document.getElementById("nombre-contacto").textContent = nombre;
    document.getElementById("correo-contacto").textContent = correo;

    formContacto.style.display = "none";
    document.getElementById("confirmacion-contacto").style.display = "flex";
});
