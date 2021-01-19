window.addEventListener("beforeunload", function () {
    var url = "http://localhost:8080/disconnect";
    fetch(url, {
        method: "POST",
        headers: {'accept': 'text/plain', 'Content-Type': 'text/plain'},
        body: username
    }).then(response => console.log(username + " se ha desconectado"));
});

//window.setInterval(PingUsers(), 500);

function PingUsers()
{
    var lista_completa;
    $('userstatus').text = '';
    var url = "http://localhost:8080/ping";
    fetch(url)
            .then(response=>response.json())
            .then(data=>{
                for(var i in data)
                {
                    console.log("User connected: "+data[i]);
                    lista_completa += data[i] += '\n';
                }
                lista_completa == ''?$('userstatus').html(lista_completa):$('usertatus').html('No hay nadie conectado');
            });
}