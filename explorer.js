function consultarDireccion() {
    var direccionBitcoin = document.getElementById("direccionBitcoin").value;
    localStorage.setItem("direccionBitcoin", direccionBitcoin); // Guarda la dirección en localStorage

    var urlAPI = "https://blockchain.info/rawaddr/" + direccionBitcoin;

    fetch(urlAPI)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //Meta
            var meta = parseFloat(document.getElementById("meta").value);
            var saldoActual = parseFloat(data.final_balance);
            var porcentajeFaltante = ((meta-saldoActual)/meta)*100;
            document.getElementById("porcentajeFaltante").innerText = "Porcentaje Faltante " + porcentajeFaltante.toFixed(2) + "%";
            
            var barraProgreso = document.getElementById("barraProgreso");
            barraProgreso.value = porcentajeFaltante;
            
            // Actualizar el contenido de los elementos existentes en el HTML
            document.getElementById('address').textContent = ":" + direccionBitcoin;
            document.getElementById('balance').textContent = + data.final_balance;
            document.getElementById('numTransacciones').innerText = + data.n_tx;

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
window.onload = function() {
    var savedAddress = localStorage.getItem("direccionBitcoin");
    if (savedAddress) {
        document.getElementById("direccionBitcoin").value = savedAddress;
        consultarDireccion();
    }
    

      var contenedor = document.getElementById('contenedor_carga');
      contenedor.style.visibility = 'hidden';
      contenedor.style.opacity = '0';
    
    

};
