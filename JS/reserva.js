// PRE-SELECCIÓN DE SERVICIO DESDE URL

const selectServicio = document.getElementById("servicio-reserva");
const params = new URLSearchParams(window.location.search);
const servicioParam = params.get("servicio");

if (servicioParam) {
    const opciones = selectServicio.options;
    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].text === servicioParam) {
            selectServicio.selectedIndex = i;
            break;
        }
    }
}


// HORAS DISPONIBLES SEGÚN FECHA

const inputFecha = document.getElementById("fecha");
const selectHora = document.getElementById("hora");

const hoy = new Date().toISOString().split("T")[0];
inputFecha.setAttribute("min", hoy);

inputFecha.addEventListener("change", () => {
    const fecha = new Date(inputFecha.value + "T00:00:00");
    const diaSemana = fecha.getDay();

    selectHora.innerHTML = "";

    if (diaSemana === 0) {
        // Domingo — no hay atención
        selectHora.innerHTML = "<option value=''>No atendemos los domingos</option>";
        selectHora.disabled = true;
    } else {
        // Lunes a sábado — 9am a 8pm
        selectHora.disabled = false;
        selectHora.innerHTML = "<option value=''>Seleccione una hora</option>";

        for (let h = 9; h <= 20; h++) {
            const hora12 = h <= 12 ? h : h - 12;
            const ampm = h < 12 ? "am" : "pm";
            const opcion = document.createElement("option");
            opcion.value = `${h}:00`;
            opcion.textContent = `${hora12}:00 ${ampm}`;
            selectHora.appendChild(opcion);
        }
    }
});


// MOSTRAR U OCULTAR SELECTOR DE SEDE

const radiosLugar = document.querySelectorAll("input[name='lugar']");
const seccionSede = document.getElementById("seccion-sede");

radiosLugar.forEach(radio => {
    radio.addEventListener("change", () => {
        seccionSede.style.display = radio.value === "domicilio" ? "none" : "block";
    });
});


// CONFIRMACIÓN AL ENVIAR

const formReserva = document.getElementById("form-reserva");

formReserva.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre   = document.getElementById("nombre-reserva").value.trim();
    const telefono = document.getElementById("telefono-reserva").value.trim();
    const servicio = document.getElementById("servicio-reserva").value;
    const fecha    = document.getElementById("fecha").value;
    const hora     = document.getElementById("hora").value;
    const lugar    = document.querySelector("input[name='lugar']:checked").value;
    const sede     = document.getElementById("sede-reserva").value;

    // Validaciones
    if (!nombre || !telefono || !servicio || !fecha || !hora) {
        alert("Por favor completa todos los campos antes de reservar.");
        return;
    }
    if (lugar === "sede" && !sede) {
        alert("Por favor selecciona una sede.");
        return;
    }

    const [anio, mes, dia] = fecha.split("-");
    const fechaLegible = `${dia}/${mes}/${anio}`;

    formReserva.style.display = "none";

    // Confirmación según tipo de atención
    if (lugar === "sede") {
        document.getElementById("detalle-reserva").textContent =
            `${nombre}, te esperamos el ${fechaLegible} a las ${hora} en ${sede} para tu servicio de ${servicio}.`;
        document.getElementById("confirmacion-sede").style.display = "flex";
    } else {
        document.getElementById("detalle-domicilio").textContent =
            `${nombre}, recibimos tu solicitud para el ${fechaLegible} a las ${hora} — servicio de ${servicio}.`;
        document.getElementById("confirmacion-domicilio").style.display = "flex";
    }
});
