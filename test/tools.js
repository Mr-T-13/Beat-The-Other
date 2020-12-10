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
    var comboContador; //Nº de combos seguidos (racha)
}