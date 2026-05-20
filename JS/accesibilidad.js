// WIDGET DE ACCESIBILIDAD

const btnAbrir     = document.getElementById("btn-accesibilidad");
const panel        = document.getElementById("panel-accesibilidad");
const btnContraste = document.getElementById("btn-contraste");
const btnFuente    = document.getElementById("btn-fuente");
const btnEnlaces   = document.getElementById("btn-enlaces");

// Cargar preferencias guardadas
if (localStorage.getItem("alto-contraste")   === "true") activar("alto-contraste",   btnContraste);
if (localStorage.getItem("texto-grande")     === "true") activar("texto-grande",     btnFuente);
if (localStorage.getItem("subrayar-enlaces") === "true") activar("subrayar-enlaces", btnEnlaces);

// Abrir y cerrar el panel
btnAbrir.addEventListener("click", () => {
    const abierto = !panel.hidden;
    panel.hidden = abierto;
    btnAbrir.setAttribute("aria-expanded", !abierto);
});

// Cerrar al hacer clic fuera
document.addEventListener("click", (e) => {
    if (!document.querySelector(".accesibilidad-widget").contains(e.target)) {
        panel.hidden = true;
        btnAbrir.setAttribute("aria-expanded", "false");
    }
});

// Asignar acción a cada botón
btnContraste.addEventListener("click", () => toggle("alto-contraste",   btnContraste));
btnFuente.addEventListener("click",    () => toggle("texto-grande",     btnFuente));
btnEnlaces.addEventListener("click",   () => toggle("subrayar-enlaces", btnEnlaces));

// Toggle
function toggle(clase, btn) {
    if (document.body.classList.contains(clase)) {
        desactivar(clase, btn);
    } else {
        activar(clase, btn);
    }
}

// Activar opción
function activar(clase, btn) {
    document.body.classList.add(clase);
    btn.classList.add("activo");
    btn.setAttribute("aria-pressed", "true");
    localStorage.setItem(clase, "true");
}

// Desactivar opción
function desactivar(clase, btn) {
    document.body.classList.remove(clase);
    btn.classList.remove("activo");
    btn.setAttribute("aria-pressed", "false");
    localStorage.setItem(clase, "false");
}
