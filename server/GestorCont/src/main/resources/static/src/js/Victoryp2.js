export default class Victoryp2 extends Phaser.Scene{
    constructor(){
        super({
            key: "Victoryp2"
        });
    }

    preload()
    {
        this.load.image('VP2','../resources/img/characters/Irlandes/Irlandes_Victoria .png');
      
        
    }

    create()
    {
        //Carga del fondo
        var bg = this.add.image(0, 0, 'VP2');
        bg.setOrigin(0,0);
      
    }
}