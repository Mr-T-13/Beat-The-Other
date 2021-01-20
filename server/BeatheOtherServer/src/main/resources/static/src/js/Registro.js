export default class Registro extends Phaser.Scene{
    constructor(){
        super({
            key: "Registro"
        });
    }

    preload()
    {
        this.load.image('log','../resources/img/Menu/Login.png');
        this.load.html('registro-form', '../src/html/registro.html');
    }

    create()
    {
        //Carga del fondo
        var bg = this.add.image(350, 100, 'log');
        bg.setOrigin(0,0);

        console.log($(window).width());
        var element = this.add.dom(($(window).width()/2)-96, 300).createFromCache('registro-form');
        element.setOrigin(0,0);
        element.addListener('click');
        this.prueba = false;
        element.on('click', function(event){
            if (event.target.name === 'sign_in')
            {
                var inputUsername = this.getChildByName('username');
                var inputNickname = this.getChildByName('nickname');
                var inputPassword = this.getChildByName('password');
                
                if(inputUsername.value !== '' && inputNickname.value !== '' && inputPassword.value !== ''){
                    var url = "http://localhost:8080/user/" + inputUsername.value + "/" + inputNickname.value + "/" + inputPassword.value;
                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.open("POST", url, false );
                    xmlHttp.send();
                    if(xmlHttp.response)
                    {
                        this.scene.scene.start('Login');
                    }
                    
                }
            }
            if (event.target.name === 'back')
            {
                this.scene.scene.start('Login');
            }

        })
    }
}