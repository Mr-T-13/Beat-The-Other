export default class Userlist extends Phaser.Scene{
    constructor(){
        super({
            key: "Userlist"
        });
    }

    preload()
    {
        this.load.image('log2','../resources/img/Menu/Login.png');
        this.load.image('back', '../resources/img/Menu/Atras.png');
    }

    create()
    {
        var usersString;
        //Carga del fondo
        var bg = this.add.image(350, 100, 'log2');
        bg.setOrigin(0,0);
        var botonBck = this.physics.add.sprite(595,710, 'back');
        botonBck.setScale(0.5);
        botonBck.setInteractive();
        botonBck.on('pointerdown', () => { this.scene.start('MainMenu');})
        
        this.add.text(500,280,"Usuarios online",{
            font: "30px Arial",
            fill: "#ff0044",
            align: "center"
            });
        var url = "http://localhost:8080/onlineUsers";
        fetch(url)
            .then(response=>response.json())
            .then(data=>{
                for(var i in data)
                {
                    usersString+= data[i]+"\n";
                    console.log("User connected: "+data[i]);
                    this.add.text(500,(i*50)+350,data[i],{
                        font: "35px Arial",
                        fill: "#ff0044",
                        align: "center"
                        });
                }
            $("usuarios").html(usersString);
            });
    }
}