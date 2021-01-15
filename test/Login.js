export default class Login extends Phaser.Scene{
    constructor(){
        super({
            key: "Login"
        });
    }

    preload()
    {
        this.load.image('log','../resources/img/Menu/Login.png');
        this.load.html('login-form', 'login.html');
    }

    create()
    {
        //Carga del fondo
        var bg = this.add.image(350, 100, 'log');
        bg.setOrigin(0,0);

        var nameInput = this.add.dom(350, 100).createFromCache('login-form');
        nameInput.addListener('click');
    }
}