
import MainMenu from './MainMenu.js';
import Login from './Login.js';
import Street from './Street.js';
import Victoryp1 from './Victoryp1.js';
import Victoryp2 from './Victoryp2.js';

var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y : 0}
        }
    },
    parent: "game",
    dom:{
        createContainer: true
    },
    scene: [Login, MainMenu, Street, Victoryp1, Victoryp2]
});