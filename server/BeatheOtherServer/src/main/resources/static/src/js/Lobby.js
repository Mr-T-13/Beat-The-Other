
export default class Lobby extends Phaser.Scene{
    constructor(){
        super({
            key: "Lobby"
        });
    }

    preload()
    {
        this.load.spritesheet('jugadores', 
            '../resources/img/Menu/Jugadores.png',
            {frameWidth: 256, frameHeight: 256})

        this.load.image('entrar','../resources/img/Menu/Entrar.png');
        this.load.image('back','../resources/img/Menu/Atras.png');
        this.load.image('jugar','../resources/img/Menu/Jugar.png');
        this.load.image('salas','../resources/img/Menu/LobbySalas.png');
        this.load.image('fondo','../resources/img/Menu/LobbyFondo.png');
        
        this.load.image('backgroundm', '../resources/img/background/Escenario_1.png');

       
        
    }

    create()
    {
        var connection= new WebSocket('ws://127.0.0.1:8080/lobby');

        //Carga del fondo
        var bg = this.add.image(0, 0, 'backgroundm');
        bg.setOrigin(0,0);

        var bg = this.add.image(600, 250, 'fondo');
        var bg = this.add.image(600, 250, 'salas');

        var message = {
            "Order" : "Join",
            "battleN" : "1"
        };

        var Order = "Join";
        var battleN = 1;

        var botonEntrar1 = this.physics.add.sprite(795,152, 'entrar');
        botonEntrar1.setInteractive();
        botonEntrar1.on('pointerdown', () => { 
            connection.send('{"Order":"Join","battleN":"0"}');
        })

        var botonEntrar2 = this.physics.add.sprite(795,254, 'entrar');
        botonEntrar2.setInteractive();
        botonEntrar2.on('pointerdown', () => { 
            connection.send('{"Order":"Join","battleN":"1"}');
        })

        var botonEntrar3 = this.physics.add.sprite(795,356, 'entrar');
        botonEntrar3.setInteractive();
        botonEntrar3.on('pointerdown', () => { 
            connection.send('{"Order":"Join","battleN":"2"}');
        })
        var botonEntrar4 = this.physics.add.sprite(795,458, 'entrar');
        botonEntrar4.setInteractive();
        botonEntrar4.on('pointerdown', () => { 
            connection.send('{"Order":"Join","battleN":"3"}');
        })

        var botonEntrar5 = this.physics.add.sprite(795,560, 'entrar');
        botonEntrar5.setInteractive();
        botonEntrar5.on('pointerdown', () => { 
            connection.send('{"Order":"Join","battleN":"4"}');
        })


        var botonJugar = this.physics.add.sprite(595,643, 'jugar');
        botonJugar.setScale(0.30);
        botonJugar.setInteractive();
        botonJugar.on('pointerdown', () => { 
            if(playerN == 1 || playerN == 2){
                this.scene.start('Street');
            }
        })

        var botonBck = this.physics.add.sprite(595,735, 'back');
        botonBck.setScale(0.35);
        botonBck.setInteractive();
        botonBck.on('pointerdown', () => { this.scene.start('MainMenu');})


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

            }            
           
        }
        
        

        
    }
}

