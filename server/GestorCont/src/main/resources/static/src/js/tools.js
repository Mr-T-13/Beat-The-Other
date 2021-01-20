//Clase Key
function Tecla(key, damage, sprite, text, sonido, animation) 
{
    this.key = key;
    this.damage = damage;
    this.sprite = sprite;
    this.text = text;
    this.sonido = sonido;
    this.animation = animation;
}
function Character ()
{
    var phsx;
    var idle;
    var punch;
    var ulti
}
//Clase Player
function Player()
{
    var teclas;
    var character;    
    var combo; //Array que guarda las teclas que tiene que pulsar
    var comboBoton; //Índice del combo
    var multiplicador; //Nº de combos seguidos (racha)
    var spritesBotones; //Array de los sprites de los botones del combo
    var spritesLetras; //Array de las tipografías
    var life; //Vida del jugador
    var lifeBar; //Sprite que muestra la barra de vida
    var lifeStatus; //Frame de la barra de vida
    var energy; //Energia del jugador
    var energyBar; //Sprite que muestra la barra de energia
    var energyStatus; //Frame de la barra de energia
    var penalizacion; //Tiempo de penalizacion
}