var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu()
    {
        Phaser.Scene.call(this, { key: 'mainmenu', active: true });
    },

    preload: function ()
    {
        // Insertar aquí los gráficos, música y demás.
        //this.load.image('face', 'assets/pics/bw-face.png');
    },

    create: function ()
    {
        //Function
    }

});

var Street = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Street ()
    {
        Phaser.Scene.call(this, { key: 'street', active: true });
        
    },
    

    preload: function()
    {
        //Carga de los sprites de los botones
        this.load.image('W','../resources/img/Buttons/Boton_Amarillo.png');
        this.load.image('A','../resources/img/Buttons/Boton_Azul.png');
        this.load.image('S','../resources/img/Buttons/Boton_Verde.png');
        this.load.image('D','../resources/img/Buttons/Boton_Naranja.png');

        this.load.spritesheet('Tipografia_Botones', 
            '../resources/img/Buttons/Tipografía/Tipografía Botones.png',
            {frameWidth: 256, frameHeight: 256})

        //Carga del spite de Yacuza
        this.load.spritesheet('Yacuza_idle',
            '../resources/img/characters/Yacuza/Yacuza_Animacion_1.png',
            {frameWidth: 768, frameHeight: 768}
        );
        this.load.spritesheet('Yacuza_punch',
            '../resources/img/characters/Yacuza/Yacuza_Animacion_2.png',
            {frameWidth: 700, frameHeight: 700}
        );
        //Carga del spite de Yacuza
        this.load.spritesheet('Irlandes_idle',
            '../resources/img/characters/Irlandes/Irlandes_Animacion_1.png',
            {frameWidth: 700, frameHeight: 700}
        );
        this.load.spritesheet('Irlandes_punch',
            '../resources/img/characters/Irlandes/Irlandes_Animacion_2.png',
            {frameWidth: 700, frameHeight: 700}
        );

        //Carga imagen del background
        this.load.image('background', 'Escenario_2.png');
        
        //Carga de la barra de vida
        this.load.spritesheet('lifeBar', 
            '../resources/img/bars/lifeBar.png',
            {frameWidth: 256, frameHeight: 256}
        );
        
        //Carga de la música
        this.load.audio('bgMusic', '../resources/music/street1.ogg');
    },

    create: function ()
    {
        //Inicialización de variables
        this.player1;
        this.player2;
        
        player1 = new Player();
        player1.teclas = [];
        player1.comboBoton = 4;
        player1.combo = [];
        player1.spritesBotones = [];
        player1.spritesLetras = [];
        player1.lifeBar;
        player1.life = 100;
        player1.lifeStatus = 0;
        
        player2 = new Player();
        player2.teclas = [];
        player2.comboBoton = 4;
        player2.combo = [];
        player2.spritesBotones = [];
        player2.spritesLetras = [];
        player2.lifeBar;
        player2.life = 100;
        player2.lifeStatus = 0;
        
        
        //Carga del fondo
        var bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0,0);
        //bg.setScale(1.5);
        
        
        
        //Carga de la música de fondo
        music = this.sound.add('bgMusic');
        music.play();
        
        
        
        
        //Carga del Yakuza
        var yakuza = new Character();
        yakuza.phsx = this.physics.add.sprite(posP1X, posP1Y, 'Yacuza');
        //player.setScale(1.5);

        this.anims.create({
            key: 'Yacuza_animacion_idle',
            frames: this.anims.generateFrameNumbers('Yacuza_idle', {start: 0, end: 1}),
            frameRate: 3,
            repeat: -1
        });
        yakuza.idle = 'Yacuza_animacion_idle';
        
        player1.lifeBar = this.add.sprite(posLifeP1X,posLifeP1Y,'lifeBar');
        player1.lifeBar.setFrame(player1.lifeStatus);
        
        
        
        //Carga del irlandés
        var irlandes = new Character();
        
        irlandes.phsx = this.physics.add.sprite(posP2X,posP2Y,'Irlandes');
        
        this.anims.create({
            key: 'Irlandes_animation_idle',
            frames: this.anims.generateFrameNumbers('Irlandes_idle', {start: 0, end:1}),
            frameRate: 3,
            repeat: -1
        });
        irlandes.idle = 'Irlandes_animation_idle';
        //Asignación de personajes a jugadores
        player1.character = yakuza;
        player2.character = irlandes;

        //Inicializar cada tecla que se vaya a usar el jugador 1
        var W       = new Tecla(this.input.keyboard.addKey('W'),    1, 'W', 'Tipografia_Botones'); 
        var A       = new Tecla(this.input.keyboard.addKey('A'),    1, 'A', 'Tipografia_Botones');
        var S       = new Tecla(this.input.keyboard.addKey('S'),    1, 'S', 'Tipografia_Botones');
        var D       = new Tecla(this.input.keyboard.addKey('D'),    1, 'D', 'Tipografia_Botones');
        
        //Inicializar cada tecla que se vaya a usar el jugador 2
        var UP      = new Tecla(this.input.keyboard.addKey('UP'),   1, 'W', 'Tipografia_Botones'); 
        var LEFT    = new Tecla(this.input.keyboard.addKey('LEFT'), 1, 'A', 'Tipografia_Botones');
        var DOWN    = new Tecla(this.input.keyboard.addKey('DOWN'), 1, 'S', 'Tipografia_Botones');
        var RIGHT   = new Tecla(this.input.keyboard.addKey('RIGHT'),1, 'D', 'Tipografia_Botones');

        //Array de teclas que usa el jugador 1
        player1.teclas.push(W);
        player1.teclas.push(A);
        player1.teclas.push(S);
        player1.teclas.push(D);
        
        //Array de teclas que usa el jugador 2
        player2.teclas.push(UP);
        player2.teclas.push(LEFT);
        player2.teclas.push(DOWN);
        player2.teclas.push(RIGHT);
        

       
    },

    update: function (time, delta)
    {
       //GameLoop en proceso
        //Si P1 ha hecho el combo completo
        if(player1.comboBoton == 4)
        {
            //Se resetean los sprites de los botones
            if(player1.spritesBotones[0] != null)
            {
                for (let i = 0; i < player1.spritesBotones.length; i++) {
                    player1.spritesBotones[i].destroy();
                    player1.spritesLetras[i].destroy();
                }
                player1.comboContador++;
            }
            //Reset del contador de botones
            player1.comboBoton = 0;

            //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
            for (let i = 0; i < 4; i++) {
                var random = Phaser.Math.Between(0, 3);
                player1.combo[i] = player1.teclas[random];
                player1.spritesBotones[i] = this.add.sprite(posBoton1X + (posNextBoton * i), posBoton1Y, player1.combo[i].sprite);
                player1.spritesBotones[i].setScale(3);
                //var text = this.add.text(spritesBotones[i].x -10, spritesBotones[i].y - 15, combo[i].text, {fontSize: '32px', fill: '#000'});
                player1.spritesLetras[i]= this.add.sprite(player1.spritesBotones[i].x , player1.spritesBotones[i].y, player1.combo[i].text);
                player1.spritesLetras[i].setFrame(random);
            }
        }
        
        //Si P2 ha hecho el combo completo
        if(player2.comboBoton == 4)
        {
            //Se resetean los sprites de los botones
            if(player2.spritesBotones[0] != null)
            {
                for (let i = 0; i < player2.spritesBotones.length; i++) {
                    player2.spritesBotones[i].destroy();
                    player2.spritesLetras[i].destroy();
                }
                player2.comboContador++;
            }
            //Reset del contador de botones
            player2.comboBoton = 0;

            //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
            for (let i = 0; i < 4; i++) {
                var random = Phaser.Math.Between(0, 3);
                player2.combo[i] = player2.teclas[random];
                player2.spritesBotones[i] = this.add.sprite(posBoton2X + (posNextBoton * i), posBoton2Y, player2.combo[i].sprite);
                player2.spritesBotones[i].setScale(3);
                //var text = this.add.text(spritesBotones[i].x -10, spritesBotones[i].y - 15, combo[i].text, {fontSize: '32px', fill: '#000'});
                player2.spritesLetras[i]= this.add.sprite(player2.spritesBotones[i].x , player2.spritesBotones[i].y, player2.combo[i].text);
                player2.spritesLetras[i].setFrame(random+4);
            }
        }

        //Añadir lo que ocurre cuando vas haciendo combos seguidos

        if(Phaser.Input.Keyboard.JustDown(player1.combo[player1.comboBoton].key))
        {
            spritesBotones[player1.comboBoton].setAlpha(0.5);
            spritesLetras[player1.comboBoton].setAlpha(0.5);

            player1.comboBoton++;
        }else if(Phaser.Input.Keyboard.JustDown(player1.teclas[0].key) || Phaser.Input.Keyboard.JustDown(player1.teclas[1].key)
                    || Phaser.Input.Keyboard.JustDown(player1.teclas[2].key) || Phaser.Input.Keyboard.JustDown(player1.teclas[3].key))
        {
            //reset combo
            player1.comboBoton = 0;
            player1.comboContador = 0;
            for (let i = 0; i < spritesBotones.length; i++) {
                spritesBotones[i].destroy();
                spritesLetras[i].destroy();
            }
            //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
            for (let i = 0; i < 4; i++) {
                var random = Phaser.Math.Between(0, 3);
                player1.combo[i] = player1.teclas[random];
                spritesBotones[i] = this.add.sprite(posBoton1X + (posNextBoton * i), posBoton1Y, player1.combo[i].sprite);
                spritesBotones[i].setScale(3);
                //var text = this.add.text(spritesBotones[i].x -10, spritesBotones[i].y - 15, combo[i].text, {fontSize: '32px', fill: '#000'});
                spritesLetras[i]= this.add.sprite(spritesBotones[i].x , spritesBotones[i].y, player1.combo[i].text);
                spritesLetras[i].setFrame(random);
            }

            //penalizacion 
        }
        
        player1.character.phsx.anims.play(player1.character.idle, true);
        player2.character.phsx.anims.play(player2.character.idle, true);
        
        player1.life
    }

});

var config={
                type: Phaser.AUTO,
                width: 1200,
                height: 800,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: {y : 0}
                    }
                },
                scene: [MainMenu,Street]
                }