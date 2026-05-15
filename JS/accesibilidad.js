// WIDGET DE ACCESIBILIDAD

// Obtengo todos los elementos del widget desde el DOM
const btnAbrir     = document.getElementById("btn-accesibilidad");
const panel        = document.getElementById("panel-accesibilidad");
const btnContraste = document.getElementById("btn-contraste");
const btnFuente    = document.getElementById("btn-fuente");
const btnEnlaces   = document.getElementById("btn-enlaces");

// CARGAR PREFERENCIAS GUARDADAS
// Al cargar la página reviso si el usuario había activado alguna opción
// en una visita anterior usando localStorage, y la reactivo automáticamente
if (localStorage.getItem("alto-contraste")   === "true") activar("alto-contraste",   btnContraste);
if (localStorage.getItem("texto-grande")     === "true") activar("texto-grande",     btnFuente);
if (localStorage.getItem("subrayar-enlaces") === "true") activar("subrayar-enlaces", btnEnlaces);

// ABRIR Y CERRAR EL PANEL
// Al hacer clic en el botón ♿ alterno la visibilidad del panel
btnAbrir.addEventListener("click", () => {
    const abierto = !panel.hidden;
    panel.hidden = abierto;
    // Actualizo el atributo aria-expanded para que los lectores de pantalla lo anuncien
    btnAbrir.setAttribute("aria-expanded", !abierto);
});

// CERRAR EL PANEL AL HACER CLIC FUERA
// Si el usuario hace clic en cualquier parte de la página fuera del widget, cierro el panel
document.addEventListener("click", (e) => {
    if (!document.querySelector(".accesibilidad-widget").contains(e.target)) {
        panel.hidden = true;
        btnAbrir.setAttribute("aria-expanded", "false");
    }
});

// ASIGNAR ACCIÓN A CADA BOTÓN DEL PANEL
// Cada botón llama a toggle con su clase CSS correspondiente
btnContraste.addEventListener("click", () => toggle("alto-contraste",   btnContraste));
btnFuente.addEventListener("click",    () => toggle("texto-grande",     btnFuente));
btnEnlaces.addEventListener("click",   () => toggle("subrayar-enlaces", btnEnlaces));

// FUNCIÓN TOGGLE
// Reviso si la clase ya está activa en el body: si lo está la desactivo, si no la activo
function toggle(clase, btn) {
    if (document.body.classList.contains(clase)) {
        desactivar(clase, btn);
    } else {
        activar(clase, btn);
    }
}

// FUNCIÓN ACTIVAR
// Agrego la clase al body, marco el botón como activo y guardo la preferencia en localStorage
function activar(clase, btn) {
    document.body.classList.add(clase);
    btn.classList.add("activo");
    btn.setAttribute("aria-pressed", "true");
    localStorage.setItem(clase, "true");
}

// FUNCIÓN DESACTIVAR
// Quito la clase del body, desmarco el botón y actualizo localStorage
function desactivar(clase, btn) {
    document.body.classList.remove(clase);
    btn.classList.remove("activo");
    btn.setAttribute("aria-pressed", "false");
    localStorage.setItem(clase, "false");
}
