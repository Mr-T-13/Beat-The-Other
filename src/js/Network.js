window.addEventListener("beforeunload", function () {
    var url = "http://localhost:8080/disconnect";
    fetch(url, {
        method: "POST",
        headers: {'accept': 'text/plain', 'Content-Type': 'text/plain'},
        body: username
    }).then(response => console.log(username + " se ha desconectado"));
});

window.setInterval(PingUsers, 500);

function PingUsers()
{
        var lista_completa = '';
        //$('userstatus').text = '';
        var url = "http://localhost:8080/onlineUsers";
    fetch(url)
            .then(response =>response.json())
            .then(data=>{
                for(var i in data)
                {
                    lista_completa += data[i] + "<br>";
                }
                lista_completa == ''?document.getElementById('userstatus').innerHTML = 'No hay nadie conectado':document.getElementById('userstatus').innerHTML = lista_completa;
            })
            .catch(rejected => {
                document.getElementById('userstatus').innerHTML = 'Servidor desconectado';
            });

    UpdateChat();
}


//Actualiza el chat
function UpdateChat()
{
    var chatString = '';
    var chatURL = "http://localhost:8080/UpdateChat";
    fetch(chatURL)
            .then(response =>response.json())
            .then(data=>{
                for(var i in data)
                {
                    chatString += data[i]+ "<br>";
                }
                document.getElementById('chat').innerHTML = chatString;
            });
}

function SendChatMsg()
{
    if(logged)
    {
        var msg = '';
        msg += document.getElementById("textmsg").value;
        var url = "http://localhost:8080/AddMsg";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", url, false );
        xmlHttp.send(username + ": " + msg);
    }
}