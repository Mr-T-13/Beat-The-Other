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

        //carga mascota
        this.load.spritesheet('pet', 
        '../resources/img/characters/Duck/pollito.png',
        {frameWidth: 128, frameHeight: 128})
        
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
        botonJugar.on('pointerdown', () => { this.scene.start('Cooperative');})
        
        var botonOpc = this.physics.add.sprite(595,310, 'Red');
        botonOpc.setInteractive();
        botonOpc.on('pointerdown', () => { this.scene.start('Userlist');})

        //MASCOTA

        pet= this.physics.add.sprite(520, 100, 'pet');
        pet.setOrigin(0,0);
        pet.setInteractive();

        pet.on('pointerdown', ()=> {
            clicks++;
        });

        this.anims.create({
            key: 'normal',
            frames: this.anims.generateFrameNumbers('pet', { start: 0, end: 2 }),
            frameRate: 2,
            repeat: 1
        });

        this.anims.create({
            key: 'love',
            frames: this.anims.generateFrameNumbers('pet', { start: 4, end: 5 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('pet', { start: 3, end: 3 }),
            frameRate: 1,
            repeat: -1
        });

        
    }

    update(){
        if(clicks<5){
            pet.anims.play('normal', true);
        }else if(clicks<=5&&clicks<10){
            pet.anims.play('love', true); 
        }else if(clicks>10){
            pet.anims.play('stop', true); 
        }
              
    }
}