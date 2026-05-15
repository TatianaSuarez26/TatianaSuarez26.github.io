// CARRUSEL DE IMÁGENES - PÁGINA DE INICIO

// Defino las rutas de las tres imágenes que conforman mi carrusel
const fotos = [
    "IMG/ImgCarrusel_01.jpg",
    "IMG/ImgCarrusel_02.jpg",
    "IMG/ImgCarrusel_03.jpg"
];

// Guardo la posición de la foto que se está mostrando en este momento
let indiceActual = 0;

// FUNCIÓN PARA CAMBIAR DE FOTO
// Recibo la dirección: -1 para ir atrás, 1 para ir adelante
// Uso el operador % para que el carrusel sea circular y vuelva al inicio al llegar al final
function cambiarFoto(direccion) {
    indiceActual = (indiceActual + direccion + fotos.length) % fotos.length;
    const img = document.getElementById("foto-activa");

    // Aplico un efecto de desvanecimiento: primero oculto la imagen
    img.style.opacity = "0";

    // Después de 200ms cambio la fuente y vuelvo a mostrarla
    setTimeout(() => {
        img.src = fotos[indiceActual];
        img.style.opacity = "1";
    }, 200);
}

// AVANCE AUTOMÁTICO
// Llamo a cambiarFoto cada 4 segundos para que el carrusel avance solo
setInterval(() => cambiarFoto(1), 4000);
