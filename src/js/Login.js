export default class Login extends Phaser.Scene{
    constructor(){
        super({
            key: "Login"
        });
    }

    preload()
    {
        this.load.image('log','../resources/img/Menu/Login.png');
        this.load.html('login-form', '../src/html/login.html');
    }

    create()
    {
        //Carga del fondo
        var bg = this.add.image(350, 100, 'log');
        bg.setOrigin(0,0);

        var element = this.add.dom(863, 300).createFromCache('login-form');
        element.setOrigin(0,0);
        element.addListener('click');
        this.prueba = false;
        element.on('click', function(event){
            if (event.target.name === 'login')
            {
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');
                
                if(inputUsername.value !== '' && inputPassword.value !== ''){
                    var url = "http://localhost:8080/user/" + inputUsername.value + "/" + inputPassword.value;
                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.open("GET", url, false );
                    xmlHttp.send();
                    if(xmlHttp.readyState==4 && xmlHttp.status == 200)
                    {
                        this.scene.scene.start('MainMenu');
                    }
                    
                }
            }
        })
    }
}