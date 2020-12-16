var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu()
    {
        Phaser.Scene.call(this, { key: 'mainmenu', active: true });
    },

    preload: function ()
    {
        this.load.spritesheet('Menu', 
            '../resources/img/Menu/Menu.png',
            {frameWidth: 256, frameHeight: 256})
        
        this.load.image('Jugar','../resources/img/Menu/Jugar.png');
        //Carga imagen del background
        this.load.image('backgroundm', '../resources/img/background/Escenario_1.png');
        
    },

    create: function ()
    {
        //Carga del fondo
        var bg = this.add.image(0, 0, 'backgroundm');
        bg.setOrigin(0,0);
        
        menuSprite = this.add.sprite(600,400,'Menu');
        menuSprite.setScale(4);
        
        botonJugar = this.physics.add.sprite(595,510, 'Jugar');
        botonJugar.setInteractive();
        botonJugar.on('pointerdown', () => { this.scene.start('Street');})
    }

});

var Victoryp1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Victoryp1()
    {
        Phaser.Scene.call(this, { key: 'victoryp1', active: true });
    },

    preload: function ()
    {
        this.load.image('VP1','../resources/img/Characters/Yakuza/Yakuza_victoria.png');
      
        
    },

    create: function ()
    {
        //Carga del fondo
        var bg = this.add.image(0, 0, 'VP1');
        bg.setOrigin(0,0);
   }

});


var Victoryp2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu()
    {
        Phaser.Scene.call(this, { key: 'victoryp2', active: true });
    },

    preload: function ()
    {
        this.load.image('VP2','../resources/img/Characters/Irlandes/Irlandes_victoria.png');
      
        
    },

    create: function ()
    {
        //Carga del fondo
        var bg = this.add.image(0, 0, 'VP2');
        bg.setOrigin(0,0);
      
    }

});




//Escena de juego
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

        //Carga del sprite de Yacuza
        this.load.spritesheet('Yacuza_idle',
            '../resources/img/characters/Yacuza/Yacuza_Animacion_1.png',
            {frameWidth: 768, frameHeight: 768}
        );
        //Carga de la animacion de ataque de Yacuza
        this.load.spritesheet('Yacuza_punch',
            '../resources/img/characters/Yacuza/Yacuza_Animacion_2.png',
            {frameWidth: 768, frameHeight: 768}
        );
        //Carga del sprite de Yacuza
        this.load.spritesheet('Irlandes_idle',
            '../resources/img/characters/Irlandes/Irlandes_Animacion_1.png',
            {frameWidth: 700, frameHeight: 700}
        );
        //Carga de la animacion de ataque de Irlandes
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

        //Carga de la barra de energia
        this.load.spritesheet('EnergyBar', 
            '../resources/img/bars/EnergyBar.png',
            {frameWidth: 256, frameHeight: 256}
        );
        
        //Carga de la música
        this.load.audio('bgMusic', '../resources/music/street1.ogg');
        
        //Carga de los sonidos
        this.load.audio('punch1', '../resources/sfx/p1.ogg');
        this.load.audio('punch2', '../resources/sfx/p2.ogg');
        this.load.audio('punch3', '../resources/sfx/p3.ogg');
        this.load.audio('punch4', '../resources/sfx/p4.ogg');
    },

    create: function ()
    {
        //Inicialización de variables
        this.player1;
        this.player2;
        
        player1 = new Player();
        player1.teclas = [];
        player1.comboBoton = 4;
        player1.multiplicador = 1;
        player1.combo = [];
        player1.spritesBotones = [];
        player1.spritesLetras = [];
        player1.lifeBar;
        player1.energyBar;
        player1.life = lifeMax;
        player1.energy = 0;
        player1.lifeStatus = 2;
        player1.energyStatus = energyBarMaxFrame;
        player1.penalizacion = 0;
        
        player2 = new Player();
        player2.teclas = [];
        player2.comboBoton = 4;
        player2.multiplicador = 1;
        player2.combo = [];
        player2.spritesBotones = [];
        player2.spritesLetras = [];
        player2.lifeBar;
        player2.energyBar;
        player2.life = lifeMax;
        player2.energy = 0;
        player2.lifeStatus = 2;
        player2.energyStatus = energyBarMaxFrame;
        player2.penalizacion = 0
        
        
        //Carga del fondo
        var bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0,0);
        
        
        
        //Asigna de la música de fondo y los sonidos
        music = this.sound.add('bgMusic');
        music.play();
       
        
        
        
        
        //Carga del Yakuza
        var yakuza = new Character();
        yakuza.phsx = this.physics.add.sprite(posP1X, posP1Y, 'Yacuza');

        this.anims.create({
            key: 'Yacuza_animacion_idle',
            frames: this.anims.generateFrameNumbers('Yacuza_idle', {start: 0, end: 1}),
            frameRate: 3,
            repeat: -1
        });
        
        this.anims.create({
            key: 'Yacuza_animacion_punch',
            frames: this.anims.generateFrameNumbers('Yacuza_punch', {start: 0, end: 4}),
            frameRate: 3,
            repeat: 0
        })

        yakuza.idle = 'Yacuza_animacion_idle';
        yakuza.punch = 'Yacuza_animacion_punch';
        
        //Mostrar por pantalla la barra de vida de jugador 1
        player1.lifeBar = this.add.sprite(posLifeP1X,posLifeP1Y,'lifeBar');
        player1.lifeBar.setScale(2);
        player1.lifeBar.setFrame(player1.lifeStatus);

        //Mostrar por pantalla la barra de vida de jugador 2
        player2.lifeBar = this.add.sprite(posLifeP2X,posLifeP2Y,'lifeBar');
        player2.lifeBar.setScale(2);
        player2.lifeBar.setFrame(player2.lifeStatus);
        player2.lifeBar.toggleFlipX();

        //Mostrar por pantalla la barra de energia de jugador 1
        player1.energyBar = this.add.sprite(posLifeP1X,posLifeP1Y,'EnergyBar');
        player1.energyBar.setScale(2);
        player1.energyBar.setFrame(energyBarMaxFrame);

        //Mostrar por pantalla la barra de energia de jugador 2
        player2.energyBar = this.add.sprite(posLifeP2X,posLifeP2Y,'EnergyBar');
        player2.energyBar.setScale(2);
        player2.energyBar.setFrame(energyBarMaxFrame);
        player2.energyBar.toggleFlipX();
        
        
        
        //Carga del irlandés
        var irlandes = new Character();
        
        irlandes.phsx = this.physics.add.sprite(posP2X,posP2Y,'Irlandes');
        
        this.anims.create({
            key: 'Irlandes_animation_idle',
            frames: this.anims.generateFrameNumbers('Irlandes_idle', {start: 0, end:1}),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'Irlandes_animation_punch',
            frames: this.anims.generateFrameNumbers('Irlandes_punch', {start: 0, end:1}),
            frameRate: 3,
            repeat: 0
        });
        irlandes.idle = 'Irlandes_animation_idle';
        irlandes.punch = 'Irlandes_animation_punch';

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
        
        //Asignación de sonidos a cada tecla
         
        player1.teclas[0].sonido = this.sound.add('punch1');
        player2.teclas[0].sonido = this.sound.add('punch1');
        player1.teclas[1].sonido = this.sound.add('punch2');
        player2.teclas[1].sonido = this.sound.add('punch2');
        player1.teclas[2].sonido = this.sound.add('punch3');
        player2.teclas[2].sonido = this.sound.add('punch3');
        player1.teclas[3].sonido = this.sound.add('punch4');
        player2.teclas[3].sonido = this.sound.add('punch4');

        //Activa animaciones de idle de los personajes
        player1.character.phsx.anims.play(player1.character.idle, true);
        player2.character.phsx.anims.play(player2.character.idle, true);
        
        //Evento para una vez terminada la animacion de ataque se active la idle
        player1.character.phsx.on('animationcomplete', () => {
            player1.character.phsx.anims.play(player1.character.idle, true);
        });
        player2.character.phsx.on('animationcomplete', () => {
            player2.character.phsx.anims.play(player2.character.idle, true);
        });
       
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
                player1.multiplicador++;
            }
            //Reset del contador de botones
            player1.comboBoton = 0;

            //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
            for (let i = 0; i < 4; i++) {
                var random = Phaser.Math.Between(0, 3);
                player1.combo[i] = player1.teclas[random];
                player1.spritesBotones[i] = this.add.sprite(posBoton1X + (posNextBoton * i), posBoton1Y, player1.combo[i].sprite);
                player1.spritesBotones[i].setScale(3);
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
                player2.multiplicador++;
            }
            //Reset del contador de botones
            player2.comboBoton = 0;

            //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
            for (let i = 0; i < 4; i++) {
                var random = Phaser.Math.Between(0, 3);
                player2.combo[i] = player2.teclas[random];
                player2.spritesBotones[i] = this.add.sprite(posBoton2X + (posNextBoton * i), posBoton2Y, player2.combo[i].sprite);
                player2.spritesBotones[i].setScale(3);
                player2.spritesLetras[i]= this.add.sprite(player2.spritesBotones[i].x , player2.spritesBotones[i].y, player2.combo[i].text);
                player2.spritesLetras[i].setFrame(random+4);
            }
        }

        //Si ha pasado el timpo de penalizacion
        if(player1.penalizacion < time)
        {   
            if(Phaser.Input.Keyboard.JustDown(player1.combo[player1.comboBoton].key))
            {
                player1.spritesBotones[player1.comboBoton].setAlpha(0.5);
                player1.spritesLetras[player1.comboBoton].setAlpha(0.5);
                player1.character.phsx.anims.play(player1.character.punch, true); //Animacion de ataque
                player1.teclas[player1.comboBoton].sonido.play();

                if(player1.comboBoton == 3) //Si es el ultimo golpe del combo
                {
                    //Resta vida al enemigo y aumenta la barra de energia dependiendo del multiplicador
                    player2.life -= player1.combo[player1.comboBoton].damage * player1.multiplicador;
                    player1.energy += (2 * player1.multiplicador); 
                }else{
                    //Resta vida al enemigo y aumenta la barra de energia
                    player2.life -= player1.combo[player1.comboBoton].damage;
                    player1.energy += 2;
                }
                //Energia maxima para que no de error
                if(player1.energy >= energyMax)
                {
                  player1.energy = energyMax;
                }
                //Actualizar barra de vida del enemigo
                player2.lifeStatus = lifeBarMaxFrame - player2.life;
                player2.lifeBar.setFrame(player2.lifeStatus);
                //Actualizar barra de energia
                player1.energyStatus = energyBarMaxFrame - player1.energy;
                player1.energyBar.setFrame(player1.energyStatus);

                player1.comboBoton++;
            }else if(Phaser.Input.Keyboard.JustDown(player1.teclas[0].key) || Phaser.Input.Keyboard.JustDown(player1.teclas[1].key)
                        || Phaser.Input.Keyboard.JustDown(player1.teclas[2].key) || Phaser.Input.Keyboard.JustDown(player1.teclas[3].key))
            {
                //reset combo
                player1.comboBoton = 0;
                player1.multiplicador = 1;
                for (let i = 0; i < player1.spritesBotones.length; i++) {
                    player1.spritesBotones[i].destroy();
                    player1.spritesLetras[i].destroy();
                }
                //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
                for (let i = 0; i < 4; i++) {
                    var random = Phaser.Math.Between(0, 3);
                    player1.combo[i] = player1.teclas[random];
                    player1.spritesBotones[i] = this.add.sprite(posBoton1X + (posNextBoton * i), posBoton1Y, player1.combo[i].sprite);
                    player1.spritesBotones[i].setScale(3);
                    player1.spritesLetras[i]= this.add.sprite(player1.spritesBotones[i].x , player1.spritesBotones[i].y, player1.combo[i].text);
                    player1.spritesLetras[i].setFrame(random);
                }

                player1.penalizacion= time + 1000; //1000 = 1 segundo de penalizacion
            }
        }

        //Si ha pasado el timpo de penalizacion
        if(player2.penalizacion < time)
        { 
            if(Phaser.Input.Keyboard.JustDown(player2.combo[player2.comboBoton].key))
            {
                player2.spritesBotones[player2.comboBoton].setAlpha(0.5);
                player2.spritesLetras[player2.comboBoton].setAlpha(0.5);
                player2.character.phsx.anims.play(player2.character.punch, true); //Animacion de ataque
                player2.teclas[player2.comboBoton].sonido.play();

                if(player2.comboBoton == 3) //Si es el ultimo golpe del combo
                {
                    //Resta vida al enemigo y aumenta la barra de energia dependiendo del multiplicador
                    player1.life -= player2.combo[player1.comboBoton].damage * player2.multiplicador;
                    player2.energy += (2 * player2.multiplicador); 
                }else{
                    //Resta vida al enemigo y aumenta la barra de energia
                    player1.life -= player2.combo[player1.comboBoton].damage;
                    player2.energy += 2;
                }
                //Energia maxima para que no de error
                if(player2.energy >= energyMax)
                {
                    player2.energy = energyMax;
                }
                //Actualizar barra de vida del enemigo
                player1.lifeStatus = lifeBarMaxFrame - player1.life;
                player1.lifeBar.setFrame(player1.lifeStatus);
                //Actualizar barra de energia
                player2.energyStatus = energyBarMaxFrame - player2.energy;
                player2.energyBar.setFrame(player2.energyStatus);

                player2.comboBoton++;
            }else if(Phaser.Input.Keyboard.JustDown(player2.teclas[0].key) || Phaser.Input.Keyboard.JustDown(player2.teclas[1].key)
                        || Phaser.Input.Keyboard.JustDown(player2.teclas[2].key) || Phaser.Input.Keyboard.JustDown(player2.teclas[3].key))
            {
                //reset combo
                player2.comboBoton = 0;
                player2.multiplicador = 1;
                for (let i = 0; i < player2.spritesBotones.length; i++) {
                    player2.spritesBotones[i].destroy();
                    player2.spritesLetras[i].destroy();
                }
                //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
                for (let i = 0; i < 4; i++) {
                    var random = Phaser.Math.Between(0, 3);
                    player2.combo[i] = player2.teclas[random];
                    player2.spritesBotones[i] = this.add.sprite(posBoton2X + (posNextBoton * i), posBoton2Y, player2.combo[i].sprite);
                    player2.spritesBotones[i].setScale(3);
                    player2.spritesLetras[i]= this.add.sprite(player2.spritesBotones[i].x , player2.spritesBotones[i].y, player2.combo[i].text);
                    player2.spritesLetras[i].setFrame(random + 4);
                }

                player2.penalizacion= time + 1000; //1000 = 1 segundo de penalizacion
            }
        }
        
        //Escenas de victoria
        if(player1.life <=0)
            this.scene.call('victoryp2');
        else if (player2.life <=0)
            this.scene.call('victoryp1');
        
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
                scene: [Street, MainMenu]
                }