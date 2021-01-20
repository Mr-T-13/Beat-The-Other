export default class Victoryp1 extends Phaser.Scene{
    constructor(){
        super({
            key: "Victoryp1"
        });
    }

    preload()
    {
        this.load.image('VP1','../resources/img/characters/Yacuza/Yacuza_Victoria.png');
      
        
    }

    create()
    {
        //Carga del fondo
        var bg = this.add.image(0, 0, 'VP1');
        bg.setOrigin(0,0);
   }
}