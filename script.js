// Definir objeto para almacenar respuestas
const respuestas = {};

// Cargar respuestas desde el archivo de texto
function cargarRespuestas() {
  fetch('respuestas.txt')
    .then(response => response.text())
    .then(data => {
      const lineas = data.split('\n');
      lineas.forEach(linea => {
        const partes = linea.split(':');
        if (partes.length === 2) {
          const clave = partes[0].trim();
          const respuesta = partes[1].trim();
          respuestas[clave] = respuesta;
        }
      });
    });
}

// Función para obtener la respuesta del chatbot
function obtenerRespuesta(mensaje) {
  mensaje = mensaje.toLowerCase();
  
  for (let key in respuestas) {
    if (mensaje.includes(key)) {
      return respuestas[key];
    }
  }
  
  return "Lo siento, no entiendo lo que estás diciendo.";
}

// Obtener el mensaje del usuario y mostrar la respuesta del chatbot
function enviarMensaje() {
  const mensajeUsuario = document.getElementById("input").value;
  const respuestaChatbot = obtenerRespuesta(mensajeUsuario);
  mostrarRespuesta(respuestaChatbot);
}

// Mostrar la respuesta del chatbot en el área de chat
function mostrarRespuesta(respuesta) {
  const chatArea = document.getElementById("chatArea");
  const respuestaDiv = document.createElement("div");
  respuestaDiv.className = "respuesta";
  respuestaDiv.innerHTML = `<strong>Chatbot:</strong> ${respuesta}`;
  chatArea.appendChild(respuestaDiv);
}

// Obtener el mensaje cuando se presione Enter o se haga clic en el botón
document.getElementById("input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    enviarMensaje();
    document.getElementById("input").value = "";
  }
});

document.getElementById("sendButton").addEventListener("click", function() {
  enviarMensaje();
  document.getElementById("input").value = "";
});

// Llamar a la función para cargar respuestas al cargar la página
cargarRespuestas();
