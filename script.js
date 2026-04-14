function updateTime() {
    const now = new Date();

    // Hora
    const time = now.toLocaleTimeString();
    document.getElementById("time").textContent = time;

    // Fecha
    const date = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById("date").textContent = date;
}

// Actualizar cada segundo
setInterval(updateTime, 1000);
updateTime();

// Obtener ubicación
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                );
                const data = await response.json();

                const city = data.address.city || data.address.town || data.address.village;
                const country = data.address.country;

                document.getElementById("location").textContent = `${city}, ${country}`;
            } catch (error) {
                document.getElementById("location").textContent = "No se pudo obtener la ubicación";
            }
        });
    } else {
        document.getElementById("location").textContent = "Geolocalización no soportada";
    }
}

getLocation();