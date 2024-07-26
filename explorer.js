function consultarDireccion() {
    var direccionBitcoin = document.getElementById("direccionBitcoin").value;
    localStorage.setItem("direccionBitcoin", direccionBitcoin); // Guarda la dirección en localStorage

    var urlAPI = "https://blockchain.info/rawaddr/" + direccionBitcoin;

    fetch(urlAPI)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            
            // Actualizar el contenido de los elementos existentes en el HTML
            document.getElementById('address').textContent = ":" + direccionBitcoin;
            document.getElementById('balance').textContent = data.final_balance;
            document.getElementById('numTransacciones').innerText = data.n_tx;

            // Actualizar las últimas 5 transacciones
            var transaccionesHTML = "";
            for (var i = 0; i < data.txs.length && i < 5; i++) {
                transaccionesHTML += "<p class=\"chip\">";
                transaccionesHTML += "Hash: " + data.txs[i].hash + "<br>";
                transaccionesHTML += "Fecha: " + new Date(data.txs[i].time * 1000).toLocaleString() + "<br>";
                transaccionesHTML += "Valor: " + data.txs[i].result;
                transaccionesHTML += "</p>";
            }
            document.getElementById('ultimasTransacciones').innerHTML = transaccionesHTML;
        })
        .catch(function(error) {
            console.error("Error al consultar la API:", error);
            document.getElementById("resultado").innerText = "Error al consultar la dirección.";
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

document.getElementById('openPopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'flex';
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});


window.onload = function() {
    var savedAddress = localStorage.getItem("direccionBitcoin");
    if (savedAddress) {
        document.getElementById("direccionBitcoin").value = savedAddress;
        consultarDireccion();
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
