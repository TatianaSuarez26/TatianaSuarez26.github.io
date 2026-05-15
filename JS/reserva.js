// PRE-SELECCIÓN DE SERVICIO DESDE URL

// Obtengo el selector de servicios del formulario
const selectServicio = document.getElementById("servicio-reserva");

// Leo los parámetros que vienen en la URL (ej: ?servicio=Uñas Acrílicas)
const params = new URLSearchParams(window.location.search);
const servicioParam = params.get("servicio");

// Si llegué desde la página de servicios con un servicio seleccionado,
// recorro las opciones del select y marco la que coincide con el parámetro
if (servicioParam) {
    const opciones = selectServicio.options;
    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].text === servicioParam) {
            selectServicio.selectedIndex = i;
            break;
        }
    }
}


// HORAS DISPONIBLES SEGÚN LA FECHA

// Obtengo los campos de fecha y hora del formulario
const inputFecha = document.getElementById("fecha");
const selectHora = document.getElementById("hora");

// Calculo la fecha de hoy y la uso como mínimo para que no se puedan elegir fechas pasadas
const hoy = new Date().toISOString().split("T")[0];
inputFecha.setAttribute("min", hoy);

// Cada vez que el usuario cambia la fecha, actualizo las horas disponibles
inputFecha.addEventListener("change", () => {
    const fecha = new Date(inputFecha.value + "T00:00:00");

    // getDay() devuelve 0 para domingo, 1 para lunes, etc.
    const diaSemana = fecha.getDay();

    // Limpio las opciones anteriores antes de cargar las nuevas
    selectHora.innerHTML = "";

    if (diaSemana === 0) {
        // Si es domingo, bloqueo el selector y muestro un aviso
        selectHora.innerHTML = "<option value=''>No atendemos los domingos</option>";
        selectHora.disabled = true;
    } else {
        // De lunes a sábado genero las horas de 9am a 8pm
        selectHora.disabled = false;
        selectHora.innerHTML = "<option value=''>Seleccione una hora</option>";

        for (let h = 9; h <= 20; h++) {
            // Convierto el formato de 24h a 12h para mostrarlo al usuario
            const hora12 = h <= 12 ? h : h - 12;
            const ampm = h < 12 ? "am" : "pm";

            const opcion = document.createElement("option");
            opcion.value = `${h}:00`;
            opcion.textContent = `${hora12}:00 ${ampm}`;
            selectHora.appendChild(opcion);
        }
    }
});


// MOSTRAR U OCULTAR EL SELECTOR DE SEDE

// Obtengo todos los radio buttons del campo "lugar"
const radiosLugar = document.querySelectorAll("input[name='lugar']");
const seccionSede = document.getElementById("seccion-sede");

// Cada vez que el usuario cambia entre "En sede" y "A domicilio",
// muestro u oculto el selector de sede según corresponda
radiosLugar.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "domicilio") {
            seccionSede.style.display = "none";
        } else {
            seccionSede.style.display = "block";
        }
    });
});


// CONFIRMACIÓN AL ENVIAR LA RESERVA

const formReserva = document.getElementById("form-reserva");

formReserva.addEventListener("submit", (e) => {
    // Evito que el formulario recargue la página al enviarse
    e.preventDefault();

    // Recojo todos los valores ingresados por el usuario
    const nombre   = document.getElementById("nombre-reserva").value.trim();
    const telefono = document.getElementById("telefono-reserva").value.trim();
    const servicio = document.getElementById("servicio-reserva").value;
    const fecha    = document.getElementById("fecha").value;
    const hora     = document.getElementById("hora").value;
    const lugar    = document.querySelector("input[name='lugar']:checked").value;
    const sede     = document.getElementById("sede-reserva").value;

    // VALIDACIONES
    // Verifico que todos los campos obligatorios estén completos
    if (!nombre || !telefono || !servicio || !fecha || !hora) {
        alert("Por favor completa todos los campos antes de reservar.");
        return;
    }
    // Si eligió sede, verifico que también haya seleccionado cuál
    if (lugar === "sede" && !sede) {
        alert("Por favor selecciona una sede.");
        return;
    }

    // Convierto la fecha de formato AAAA-MM-DD a DD/MM/AAAA para mostrarla de forma legible
    const [anio, mes, dia] = fecha.split("-");
    const fechaLegible = `${dia}/${mes}/${anio}`;

    // Oculto el formulario para mostrar el mensaje de confirmación
    formReserva.style.display = "none";

    // MENSAJE SEGÚN EL TIPO DE ATENCIÓN
    if (lugar === "sede") {
        // Si eligió sede, muestro la confirmación con los datos de la cita
        document.getElementById("detalle-reserva").textContent =
            `${nombre}, te esperamos el ${fechaLegible} a las ${hora} en ${sede} para tu servicio de ${servicio}.`;
        document.getElementById("confirmacion-sede").style.display = "flex";
    } else {
        // Si eligió domicilio, muestro la confirmación con aviso de WhatsApp
        document.getElementById("detalle-domicilio").textContent =
            `${nombre}, recibimos tu solicitud para el ${fechaLegible} a las ${hora} — servicio de ${servicio}.`;
        document.getElementById("confirmacion-domicilio").style.display = "flex";
    }
});
