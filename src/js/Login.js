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
                
                this.scene.start('MainMenu');
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');
                
                if(inputUsername.value !== '' && inputPassword.value !== ''){
                    this.prueba = isLogged(inputUsername.value, inputPassword.value);                    
                }
            }
        })
        console.log(this.prueba);

        function isLogged(name, password)
        {
            $(document).ready(function(){
                $.ajax({
                    url: "http://localhost:8080/user/" + name + "/" + password,
                }).done(function(data){
                    if(data.nombre !== null)
                    {
                        this.scene.start('MainMenu');
                        return true;
                    }else
                    {
                        return false;
                    }
                });
            });
        }
    }

    update()
    { console.log(this.prueba);
        if(this.prueba)
        {
            this.scene.start('MainMenu');
        }
    }
}