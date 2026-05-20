// CARRUSEL DE IMÁGENES

const fotos = [
    "IMG/ImgCarrusel_01.jpg",
    "IMG/ImgCarrusel_02.jpg",
    "IMG/ImgCarrusel_03.jpg"
];

let indiceActual = 0;

// Cambiar foto
function cambiarFoto(direccion) {
    indiceActual = (indiceActual + direccion + fotos.length) % fotos.length;
    const img = document.getElementById("foto-activa");
    img.style.opacity = "0";
    setTimeout(() => {
        img.src = fotos[indiceActual];
        img.style.opacity = "1";
    }, 200);
}

// Avance automático
setInterval(() => cambiarFoto(1), 4000);
