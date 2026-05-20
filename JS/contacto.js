// CONFIRMACIÓN AL ENVIAR EL FORMULARIO DE CONTACTO

const formContacto = document.getElementById("form-contacto");

formContacto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();

    document.getElementById("nombre-contacto").textContent = nombre;

    formContacto.style.display = "none";
    document.getElementById("confirmacion-contacto").style.display = "flex";
});
