export default class Street extends Phaser.Scene{
    constructor(){
        super({
            key: "Street"
        });
    }
    preload()
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
        this.load.image('background', '../resources/img/Background/Escenario_2.png');
        
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
    }

    create()
    {
        /*var connection= new WebSocket('ws://127.0.0.1:8080/battle');*/

        //Inicialización de variables
        this.player1;
        this.player2;
        
        this.player1 = new Player();
        this.player1.teclas = [];
        this.player1.comboBoton = 4;
        this.player1.multiplicador = 1;
        this.player1.combo = [];
        this.player1.spritesBotones = [];
        this.player1.spritesLetras = [];
        this.player1.lifeBar;
        this.player1.energyBar;
        this.player1.life = lifeMax;
        this.player1.energy = 0;
        this.player1.lifeStatus = 2;
        this.player1.energyStatus = energyBarMaxFrame;
        this.player1.penalizacion = 0;
        
        this.player2 = new Player();
        this.player2.teclas = [];
        this.player2.comboBoton = 4;
        this.player2.multiplicador = 1;
        this.player2.combo = [];
        this.player2.spritesBotones = [];
        this.player2.spritesLetras = [];
        this.player2.lifeBar;
        this.player2.energyBar;
        this.player2.life = lifeMax;
        this.player2.energy = 0;
        this.player2.lifeStatus = 2;
        this.player2.energyStatus = energyBarMaxFrame;
        this.player2.penalizacion = 0

        enemyLife = lifeMax;
        playerLife = lifeMax;
        
        
        //Carga del fondo
        var bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0,0);
        
        
        
        //Asigna de la música de fondo y los sonidos
        var music = this.sound.add('bgMusic');
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
        this.player1.lifeBar = this.add.sprite(posLifeP1X,posLifeP1Y,'lifeBar');
        this.player1.lifeBar.setScale(2);
        this.player1.lifeBar.setFrame(this.player1.lifeStatus);

        //Mostrar por pantalla la barra de vida de jugador 2
        this.player2.lifeBar = this.add.sprite(posLifeP2X,posLifeP2Y,'lifeBar');
        this.player2.lifeBar.setScale(2);
        this.player2.lifeBar.setFrame(this.player2.lifeStatus);
        this.player2.lifeBar.toggleFlipX();

        //Mostrar por pantalla la barra de energia de jugador 1
        this.player1.energyBar = this.add.sprite(posLifeP1X,posLifeP1Y,'EnergyBar');
        this.player1.energyBar.setScale(2);
        this.player1.energyBar.setFrame(energyBarMaxFrame);

        //Mostrar por pantalla la barra de energia de jugador 2
        this.player2.energyBar = this.add.sprite(posLifeP2X,posLifeP2Y,'EnergyBar');
        this.player2.energyBar.setScale(2);
        this.player2.energyBar.setFrame(energyBarMaxFrame);
        this.player2.energyBar.toggleFlipX();
        
        
        
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
        this.player1.character = yakuza;
        this.player2.character = irlandes;

        if(playerN == 1)
        {
            //Inicializar cada tecla que se vaya a usar el jugador 1
            var W       = new Tecla(this.input.keyboard.addKey('W'),    1, 'W', 'Tipografia_Botones'); 
            var A       = new Tecla(this.input.keyboard.addKey('A'),    1, 'A', 'Tipografia_Botones');
            var S       = new Tecla(this.input.keyboard.addKey('S'),    1, 'S', 'Tipografia_Botones');
            var D       = new Tecla(this.input.keyboard.addKey('D'),    1, 'D', 'Tipografia_Botones');

            //Array de teclas que usa el jugador 1
            this.player1.teclas.push(W);
            this.player1.teclas.push(A);
            this.player1.teclas.push(S);
            this.player1.teclas.push(D);

            //Asignación de sonidos a cada tecla
            this.player1.teclas[0].sonido = this.sound.add('punch1');
            this.player1.teclas[1].sonido = this.sound.add('punch2');
            this.player1.teclas[2].sonido = this.sound.add('punch3');
            this.player1.teclas[3].sonido = this.sound.add('punch4');
        }

        if(playerN == 2)
        {
            //Inicializar cada tecla que se vaya a usar el jugador 1
            var UP      = new Tecla(this.input.keyboard.addKey('W'),   1, 'W', 'Tipografia_Botones'); 
            var LEFT    = new Tecla(this.input.keyboard.addKey('A'),   1, 'A', 'Tipografia_Botones');
            var DOWN    = new Tecla(this.input.keyboard.addKey('S'),   1, 'S', 'Tipografia_Botones');
            var RIGHT   = new Tecla(this.input.keyboard.addKey('D'),   1, 'D', 'Tipografia_Botones');
        
            //Array de teclas que usa el jugador 2
            this.player2.teclas.push(UP);
            this.player2.teclas.push(LEFT);
            this.player2.teclas.push(DOWN);
            this.player2.teclas.push(RIGHT);

            //Asignación de sonidos a cada tecla
            this.player2.teclas[0].sonido = this.sound.add('punch1');
            this.player2.teclas[1].sonido = this.sound.add('punch2');
            this.player2.teclas[2].sonido = this.sound.add('punch3');
            this.player2.teclas[3].sonido = this.sound.add('punch4');
        }
        
        /*
        //Inicializar cada tecla que se vaya a usar el jugador 2
        var UP      = new Tecla(this.input.keyboard.addKey('UP'),   1, 'W', 'Tipografia_Botones'); 
        var LEFT    = new Tecla(this.input.keyboard.addKey('LEFT'), 1, 'A', 'Tipografia_Botones');
        var DOWN    = new Tecla(this.input.keyboard.addKey('DOWN'), 1, 'S', 'Tipografia_Botones');
        var RIGHT   = new Tecla(this.input.keyboard.addKey('RIGHT'),1, 'D', 'Tipografia_Botones');
        */
       
        //Activa animaciones de idle de los personajes
        this.player1.character.phsx.anims.play(this.player1.character.idle, true);
        this.player2.character.phsx.anims.play(this.player2.character.idle, true);
        
        //Evento para una vez terminada la animacion de ataque se active la idle
        this.player1.character.phsx.on('animationcomplete', () => {
            this.player1.character.phsx.anims.play(this.player1.character.idle, true);
        });
        this.player2.character.phsx.on('animationcomplete', () => {
            this.player2.character.phsx.anims.play(this.player2.character.idle, true);
        });
       
    }

    update(time, delta)
    {
        //GameLoop en proceso
        if(playerN == 1)
        {
            this.player1.life = playerLife;
            this.player1.lifeStatus = lifeBarMaxFrame - this.player1.life;
            this.player1.lifeBar.setFrame(this.player1.lifeStatus);

            //Si P1 ha hecho el combo completo
            if(this.player1.comboBoton == 4)
            {
                //Se resetean los sprites de los botones
                if(this.player1.spritesBotones[0] != null)
                {
                    for (let i = 0; i < this.player1.spritesBotones.length; i++) {
                        this.player1.spritesBotones[i].destroy();
                        this.player1.spritesLetras[i].destroy();
                    }
                    this.player1.multiplicador++;
                }
                //Reset del contador de botones
                this.player1.comboBoton = 0;

                //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
                for (let i = 0; i < 4; i++) {
                    var random = Phaser.Math.Between(0, 3);
                    this.player1.combo[i] = this.player1.teclas[random];
                    this.player1.spritesBotones[i] = this.add.sprite(posBoton1X + (posNextBoton * i), posBoton1Y, this.player1.combo[i].sprite);
                    this.player1.spritesBotones[i].setScale(3);
                    this.player1.spritesLetras[i]= this.add.sprite(this.player1.spritesBotones[i].x , this.player1.spritesBotones[i].y, this.player1.combo[i].text);
                    this.player1.spritesLetras[i].setFrame(random);
                }
            }
            //Si ha pasado el timpo de penalizacion
            if(this.player1.penalizacion < time)
            {   
                if(Phaser.Input.Keyboard.JustDown(this.player1.combo[this.player1.comboBoton].key))
                {
                    this.player1.spritesBotones[this.player1.comboBoton].setAlpha(0.5);
                    this.player1.spritesLetras[this.player1.comboBoton].setAlpha(0.5);
                    this.player1.character.phsx.anims.play(this.player1.character.punch, true); //Animacion de ataque
                    this.player1.teclas[this.player1.comboBoton].sonido.play();

                    if(this.player1.comboBoton == 3) //Si es el ultimo golpe del combo
                    {
                        //Resta vida al enemigo y aumenta la barra de energia dependiendo del multiplicador
                        var dmgTemp = this.player1.combo[this.player1.comboBoton].damage * this.player1.multiplicador;
                        connection2.send('{"Order":"Attack","dmg": ' + dmgTemp +', "attacker" : ' + playerN + ', "battleNum":"0"}');
                        //this.player2.life -= this.player1.combo[this.player1.comboBoton].damage * this.player1.multiplicador;
                        this.player2.life = enemyLife;
                        this.player1.energy += (2 * this.player1.multiplicador); 
                    }else{
                        //Resta vida al enemigo y aumenta la barra de energia
                        var dmgTemp = this.player1.combo[this.player1.comboBoton].damage;
                        connection2.send('{"Order":"Attack","dmg": ' + dmgTemp +', "attacker" : ' + playerN + ', "battleNum":"0"}');
                        //this.player2.life -= this.player1.combo[this.player1.comboBoton].damage;
                        this.player2.life = enemyLife;
                        this.player1.energy += 2;
                    }
                    //Energia maxima para que no de error
                    if(this.player1.energy >= energyMax)
                    {
                        this.player1.energy = energyMax;
                    }
                    //Actualizar barra de vida del enemigo
                    this.player2.lifeStatus = lifeBarMaxFrame - this.player2.life;
                    this.player2.lifeBar.setFrame(this.player2.lifeStatus);
                    //Actualizar barra de energia
                    this.player1.energyStatus = energyBarMaxFrame - this.player1.energy;
                    this.player1.energyBar.setFrame(this.player1.energyStatus);

                    this.player1.comboBoton++;
                }else if(Phaser.Input.Keyboard.JustDown(this.player1.teclas[0].key) || Phaser.Input.Keyboard.JustDown(this.player1.teclas[1].key)
                            || Phaser.Input.Keyboard.JustDown(this.player1.teclas[2].key) || Phaser.Input.Keyboard.JustDown(this.player1.teclas[3].key))
                {
                    //reset combo
                    this.player1.comboBoton = 0;
                    this.player1.multiplicador = 1;
                    for (let i = 0; i < this.player1.spritesBotones.length; i++) {
                        this.player1.spritesBotones[i].destroy();
                        this.player1.spritesLetras[i].destroy();
                    }
                    //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
                    for (let i = 0; i < 4; i++) {
                        var random = Phaser.Math.Between(0, 3);
                        this.player1.combo[i] = this.player1.teclas[random];
                        this.player1.spritesBotones[i] = this.add.sprite(posBoton1X + (posNextBoton * i), posBoton1Y, this.player1.combo[i].sprite);
                        this.player1.spritesBotones[i].setScale(3);
                        this.player1.spritesLetras[i]= this.add.sprite(this.player1.spritesBotones[i].x , this.player1.spritesBotones[i].y, this.player1.combo[i].text);
                        this.player1.spritesLetras[i].setFrame(random);
                    }

                    this.player1.penalizacion= time + 1000; //1000 = 1 segundo de penalizacion
                }
            }
        }
        if(playerN == 2)
        {   
            this.player2.life = playerLife;
            this.player2.lifeStatus = lifeBarMaxFrame - this.player2.life;
            this.player2.lifeBar.setFrame(this.player2.lifeStatus);

            //Si P2 ha hecho el combo completo
            if(this.player2.comboBoton == 4)
            {
                //Se resetean los sprites de los botones
                if(this.player2.spritesBotones[0] != null)
                {
                    for (let i = 0; i < this.player2.spritesBotones.length; i++) {
                        this.player2.spritesBotones[i].destroy();
                        this.player2.spritesLetras[i].destroy();
                    }
                    this.player2.multiplicador++;
                }
                //Reset del contador de botones
                this.player2.comboBoton = 0;

                //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
                for (let i = 0; i < 4; i++) {
                    var random = Phaser.Math.Between(0, 3);
                    this.player2.combo[i] = this.player2.teclas[random];
                    this.player2.spritesBotones[i] = this.add.sprite(posBoton2X + (posNextBoton * i), posBoton2Y, this.player2.combo[i].sprite);
                    this.player2.spritesBotones[i].setScale(3);
                    this.player2.spritesLetras[i]= this.add.sprite(this.player2.spritesBotones[i].x , this.player2.spritesBotones[i].y, this.player2.combo[i].text);
                    this.player2.spritesLetras[i].setFrame(random+4);
                }
            }

             //Si ha pasado el timpo de penalizacion
            if(this.player2.penalizacion < time)
            { 
                if(Phaser.Input.Keyboard.JustDown(this.player2.combo[this.player2.comboBoton].key))
                {
                    this.player2.spritesBotones[this.player2.comboBoton].setAlpha(0.5);
                    this.player2.spritesLetras[this.player2.comboBoton].setAlpha(0.5);
                    this.player2.character.phsx.anims.play(this.player2.character.punch, true); //Animacion de ataque
                    this.player2.teclas[this.player2.comboBoton].sonido.play();

                    if(this.player2.comboBoton == 3) //Si es el ultimo golpe del combo
                    {
                        //Resta vida al enemigo y aumenta la barra de energia dependiendo del multiplicador
                        var dmgTemp = this.player2.combo[this.player2.comboBoton].damage * this.player2.multiplicador;
                        connection2.send('{"Order":"Attack","dmg": ' + dmgTemp +', "attacker" : ' + playerN + ', "battleNum":"0"}');
                        //this.player1.life -= this.player2.combo[this.player1.comboBoton].damage * this.player2.multiplicador;
                        this.player1.life = enemyLife;
                        this.player2.energy += (2 * this.player2.multiplicador); 
                    }else{
                        //Resta vida al enemigo y aumenta la barra de energia
                        var dmgTemp = this.player2.combo[this.player2.comboBoton].damage;
                        connection2.send('{"Order":"Attack","dmg": ' + dmgTemp +', "attacker" : ' + playerN + ', "battleNum":"0"}');
                        //this.player1.life -= this.player2.combo[this.player1.comboBoton].damage;
                        this.player1.life = enemyLife;
                        this.player2.energy += 2;
                    }
                    //Energia maxima para que no de error
                    if(this.player2.energy >= energyMax)
                    {
                        this.player2.energy = energyMax;
                    }
                    //Actualizar barra de vida del enemigo
                    this.player1.lifeStatus = lifeBarMaxFrame - this.player1.life;
                    this.player1.lifeBar.setFrame(this.player1.lifeStatus);
                    //Actualizar barra de energia
                    this.player2.energyStatus = energyBarMaxFrame - this.player2.energy;
                    this.player2.energyBar.setFrame(this.player2.energyStatus);

                    this.player2.comboBoton++;
                }else if(Phaser.Input.Keyboard.JustDown(this.player2.teclas[0].key) || Phaser.Input.Keyboard.JustDown(this.player2.teclas[1].key)
                            || Phaser.Input.Keyboard.JustDown(this.player2.teclas[2].key) || Phaser.Input.Keyboard.JustDown(this.player2.teclas[3].key))
                {
                    //reset combo
                    this.player2.comboBoton = 0;
                    this.player2.multiplicador = 1;
                    for (let i = 0; i < this.player2.spritesBotones.length; i++) {
                        this.player2.spritesBotones[i].destroy();
                        this.player2.spritesLetras[i].destroy();
                    }
                    //Crea un array donde guarda el combo generado aleatoriamente con las teclas creadas
                    for (let i = 0; i < 4; i++) {
                        var random = Phaser.Math.Between(0, 3);
                        this.player2.combo[i] = this.player2.teclas[random];
                        this.player2.spritesBotones[i] = this.add.sprite(posBoton2X + (posNextBoton * i), posBoton2Y, this.player2.combo[i].sprite);
                        this.player2.spritesBotones[i].setScale(3);
                        this.player2.spritesLetras[i]= this.add.sprite(this.player2.spritesBotones[i].x , this.player2.spritesBotones[i].y, this.player2.combo[i].text);
                        this.player2.spritesLetras[i].setFrame(random + 4);
                    }

                    this.player2.penalizacion= time + 1000; //1000 = 1 segundo de penalizacion
                }
            }
        }
        
        //Escenas de victoria
        if(this.player1.life <=0)
            this.scene.start('Victoryp2');
        else if (this.player2.life <=0)
            this.scene.start('Victoryp1');

        connection2.onmessage = function(msg) {
            console.log(msg.data);
            var obj = JSON.parse(msg.data);
            enemyLife = obj.enemyLife;
            playerLife = obj.playerLife;
        };
        
    }
}