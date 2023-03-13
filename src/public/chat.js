let baseUrl = "http://localhost:8080";
let socket = io.connect(baseUrl, {
    'forceNew': true,
    transport: ["polling"]
});

socket.on('mensajes', function (msjs) {
    document.querySelector('#messages').innerHTML = msjs.map(msj => `<strong>Usuario: ${msj.mensaje.author.alias}</strong> -> Mensaje: ${msj.mensaje.text}`).join('<br>')
});

const addMessage = () => {
    const data = {
        author:{
            id: document.getElementById("email").value,
            name:document.getElementById("name").value,
            lastname:document.getElementById("lastname").value,
            age:document.getElementById("age").value,
            alias:document.getElementById("alias").value,
            avatar:document.getElementById("avatar").value,
        },
        text: document.getElementById("texto").value
    }
    socket.emit('mensaje', data);
    fetch(baseUrl + '/api/messages/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json; charset=UTF-8'
        }
    }).then(res => { })
}