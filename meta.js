// Función para consultar la dirección Bitcoin
function consultarDireccion() {
    var direccionBitcoinElement = document.getElementById("direccionBitcoin");
    if (!direccionBitcoinElement) {
        console.error("Elemento con ID 'direccionBitcoin' no encontrado.");
        return;
    }
    var direccionBitcoin = direccionBitcoinElement.value;
    localStorage.setItem("direccionBitcoin", direccionBitcoin); // Guarda la dirección en localStorage

    var urlAPI = "https://blockchain.info/rawaddr/" + direccionBitcoin;

    fetch(urlAPI)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Meta
            var metaElement = document.getElementById("meta");
            if (!metaElement) {
                console.error("Elemento con ID 'meta' no encontrado.");
                return;
            }
            var meta = parseFloat(metaElement.value);
            localStorage.setItem("meta", meta);
            var saldoActual = parseFloat(data.final_balance);
            var porcentajeFaltante = ((meta - saldoActual) / meta) * 100;

            // Verificar si porcentajeFaltante es un número finito
            if (isFinite(porcentajeFaltante)) {
                var porcentajeFaltanteElement = document.getElementById("porcentajeFaltante");
                if (porcentajeFaltanteElement) {
                    porcentajeFaltanteElement.innerText = "Porcentaje Faltante " + porcentajeFaltante.toFixed(2) + "%";
                }
                var barraProgreso = document.getElementById("barraProgreso");
                if (barraProgreso) {
                    barraProgreso.value = porcentajeFaltante;
                }
            } else {
                var porcentajeFaltanteElement = document.getElementById("porcentajeFaltante");
                if (porcentajeFaltanteElement) {
                    porcentajeFaltanteElement.innerText = "Porcentaje Faltante: N/A";
                }
                var barraProgreso = document.getElementById("barraProgreso");
                if (barraProgreso) {
                    barraProgreso.value = 0;
                }
            }
        })
        .catch(function(error) {
            console.error("Error al consultar la API:", error);
            var resultadoElement = document.getElementById("resultado");
            if (resultadoElement) {
                resultadoElement.innerText = "Error al consultar la dirección.";
            }
        });
}

// Función para guardar la fecha en el localStorage
function guardarFecha() {
    const fecha = document.getElementById('fecha').value;
    localStorage.setItem('fechaSeleccionada', fecha);
    alert('Fecha guardada: ' + fecha);
    mostrarFecha(fecha);
}
function mostrarFecha(fecha) {
    const fechaTextoElement = document.getElementById('fechaTexto');
    fechaTextoElement.innerText = '' + fecha;
}

document.getElementById('toggleButton').addEventListener('click', function() {
    var toggleArea = document.getElementById('toggleArea');
    if (toggleArea.classList.contains('hidden')) {
        toggleArea.classList.remove('hidden');
    } else {
        toggleArea.classList.add('hidden');
    }
});


// Al cargar la página, recuperar la dirección Bitcoin, meta y fecha almacenadas (si existen)
window.onload = function() {
    var savedAddress = localStorage.getItem("direccionBitcoin");
    if (savedAddress) {
        document.getElementById("direccionBitcoin").value = savedAddress;
        consultarDireccion();
    }

    var savedMeta = localStorage.getItem("meta");
    if (savedMeta) {
        document.getElementById("meta").value = savedMeta;
    }

    const fechaGuardada = localStorage.getItem('fechaSeleccionada');
    if (fechaGuardada) {
        document.getElementById('fecha').value = fechaGuardada;
        mostrarFecha(fechaGuardada);
    }

    
    var contenedor = document.getElementById('contenedor_carga');
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';
    
};
