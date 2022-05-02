//Collaborator Names: Nicolas Guevara, Jocque Jefferson, Daniel Olaes
//Game Title: You've Got Mail
//Date completed: 5/1/2022
//Creative Tilt:

let config = {
   parent: 'phaser-game',
   type: Phaser.AUTO,
   width: 1000,
   height: 600,
   physics: {
      default: 'arcade',
      arcade: {
         gravity: {y: 200},
         debug: false
      }
   },
   scene:  [Menu, Play, GameOver]
}

let game = new Phaser.Game(config);

//the y distance between lanes
let differenceY = game.config.height/4;
//global variable to keep score to display in multiple scenes
let score = 0;
let keyUP, keyDOWN, keySPACE;