// CONFIRMACIÓN AL ENVIAR EL FORMULARIO DE CONTACTO
const formContacto = document.getElementById("form-contacto");

formContacto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();  // ← id correcto
    const errorMsg = document.getElementById("error-email");      // ← id correcto

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
        errorMsg.classList.add("visible");
        return;
    }
    errorMsg.classList.remove("visible");
    document.getElementById("nombre-contacto").textContent = nombre;
    formContacto.style.display = "none";
    document.getElementById("confirmacion-contacto").style.display = "flex";
});
