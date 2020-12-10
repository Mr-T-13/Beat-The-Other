var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu ()
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
    

    preload: function ()
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
        
        //Carga de la música
        this.load.audio('bgMusic', '../resources/music/street1.ogg');
    },

    create: function ()
    {
        this.player1;
        this.player2;
        player1 = new Player();
        player1.teclas = [];
        player2 = new Player();
        player2.teclas = [];
        this.spritesBotones; //Array de los sprites de los botones del combo
        this.spritesLetras; //Array de las tipografías
        
        //Carga del fondo
        var bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0,0);
        //bg.setScale(1.5);
        
        //Carga de la música de fondo
        music = this.sound.add('bgMusic');

        music.play();
        
        //Carga del Yakuza
        var yakuza = new Character();
        yakuza.phsx = this.physics.add.sprite(225, 525, 'Yacuza');
        //player.setScale(1.5);

        this.anims.create({
            key: 'Yacuza_animacion_idle',
            frames: this.anims.generateFrameNumbers('Yacuza_idle', {start: 0, end: 1}),
            frameRate: 3,
            repeat: -1
        });
        yakuza.idle = 'Yacuza_animacion_idle';
        
        //Carga del irlandés
        var irlandes = new Character();
        
        irlandes.phsx = this.physics.add.sprite(800,580,'Irlandes');
        
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

        //Inicializar cada tecla que se vaya a usar
        var W = new Tecla(this.input.keyboard.addKey('W'), 1, 'W', 'Tipografia_Botones'); 
        var A = new Tecla(this.input.keyboard.addKey('A'), 1, 'A', 'Tipografia_Botones');
        var S = new Tecla(this.input.keyboard.addKey('S'), 1, 'S', 'Tipografia_Botones');
        var D = new Tecla(this.input.keyboard.addKey('D'), 1, 'D', 'Tipografia_Botones');
        //Inicializar cada tecla que se vaya a usar
        var UP = new Tecla(this.input.keyboard.addKey("keydown_UP"), 1, 'Arriba', 'Tipografia_Botones'); 
        var LEFT = new Tecla(this.input.keyboard.addKey("keydown_LEFT"), 1, 'Izda', 'Tipografia_Botones');
        var DOWN = new Tecla(this.input.keyboard.addKey("keydown_DOWN"), 1, 'Abajo', 'Tipografia_Botones');
        var RIGHT = new Tecla(this.input.keyboard.addKey("keydown_RIGHT"), 1, 'Dcha', 'Tipografia_Botones');

        //Array de teclas que usa el jugador 1
        player1.teclas.push(W);
        player1.teclas.push(A);
        player1.teclas.push(S);
        player1.teclas.push(D);
        
        //Array de teclas que usa el jugador 2
        player2.teclas[0] = UP;
        player2.teclas[1] = LEFT;
        player2.teclas[2] = DOWN;
        player2.teclas[3] = RIGHT;
        

        player1.comboBoton = 4;
        player1.combo = [];
        player2.comboBoton = 4;
        player2.combo = [];
        spritesBotones = [];
        spritesLetras = [];
    },

    update: function (time, delta)
    {
       //GameLoop en proceso
        //Si ha hecho el combo completo
        if(player1.comboBoton == 4)
        {
            //Se resetean los sprites de los botones
            if(spritesBotones[0] != null)
            {
                for (let i = 0; i < spritesBotones.length; i++) {
                    spritesBotones[i].destroy();
                    spritesLetras[i].destroy();
                }
                player1.comboContador++;
            }
            //Reset del contador de botones
            player1.comboBoton = 0;

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