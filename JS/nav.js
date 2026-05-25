const btnMenu = document.getElementById("btn-menu");
const navLinks = document.getElementById("nav-links");

if (btnMenu && navLinks) {
    btnMenu.addEventListener("click", () => {
        const abierto = navLinks.classList.toggle("abierto");
        btnMenu.setAttribute("aria-expanded", abierto);
        btnMenu.textContent = abierto ? "✕" : "☰";
    });
}
