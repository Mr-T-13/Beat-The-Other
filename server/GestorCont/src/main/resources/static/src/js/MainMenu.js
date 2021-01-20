export default class MainMenu extends Phaser.Scene{
    constructor(){
        super({
            key: "MainMenu"
        });
    }
    preload()
    {
        this.load.spritesheet('Menu', 
            '../resources/img/Menu/Menu.png',
            {frameWidth: 256, frameHeight: 256})
        
        this.load.image('Jugar','../resources/img/Menu/Jugar.png');
        this.load.image('Red','../resources/img/Menu/Red.png')
        //Carga imagen del background
        this.load.image('backgroundm', '../resources/img/background/Escenario_1.png');
        
    }

    create()
    {
        //Carga del fondo
        var bg = this.add.image(0, 0, 'backgroundm');
        bg.setOrigin(0,0);
        
        var menuSprite = this.add.sprite(600,400,'Menu');
        menuSprite.setScale(4);
        
        var botonJugar = this.physics.add.sprite(595,510, 'Jugar');
        botonJugar.setInteractive();
        botonJugar.on('pointerdown', () => { this.scene.start('Street');})
        
        var botonOpc = this.physics.add.sprite(595,310, 'Red');
        botonOpc.setInteractive();
        botonOpc.on('pointerdown', () => { this.scene.start('Userlist');})
    }
}