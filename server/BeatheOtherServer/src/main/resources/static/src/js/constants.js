//Posiciones comunes
var posNextBoton = 75;
var energyMax = 49;
var lifeMax = 60;

//Frames de referencia
var lifeBarMaxFrame = 62;
var energyBarMaxFrame = 51;

//Posiciones Jugador 1
var posBoton1X  = 100;
var posBoton1Y  = 200;
var posP1X      = 225;
var posP1Y      = 525;
var posLifeP1X  = 150;
var posLifeP1Y  = 100;



//Posiciones Jugador 2
var posBoton2X  = 800;
var posBoton2Y  = 200;
var posP2X      = 900;
var posP2Y      = 580;
var posLifeP2X  = 1050;
var posLifeP2Y  = 100;

//Variables red
var username;
var lastUsers;
var logged;
var playerN;
var battleN;
var enemyLife;
var playerLife;
var enemyCombo;
var playerCombo;

//Variables mascota
var clicks=0;
var pet;

//variables cooperativo
var scoreGoal=100;
var scoreText;

//variables saco
var saco;

//WebSocket
var connection = new WebSocket('ws://127.0.0.1:8080/wsMgr');

connection.onmessage = function(msg) {
    console.log("WS message: " + msg.data);
    if(msg.data == '1'){
        playerN = 1;
        console.log(playerN);
    } else if(msg.data == '2'){
        playerN = 2;
    } else if(msg.data == '-1'){
        console.log("La sala está llena");
    } else{
        var obj = JSON.parse(msg.data);
        enemyLife = obj.enemyLife;
        playerLife = obj.playerLife;
        enemyCombo = obj.enemyCombo;
        playerCombo = obj.playerCombo;
    }           
};

connection.onclose = function() {
    console.log("se ha cerrado");
    connection.send('{"Order":"Leave", "playerN" : ' + playerN + ', "battleN":' + battleN + '}');
}

