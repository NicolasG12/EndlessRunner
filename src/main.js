let config = {
   type: Phaser.AUTO,
   width: 1000,
   height: 600,
   physics: {
      default: 'arcade',
      arcade: {
         gravity: {y: 200},
         debug: true
      }
   },
   scene:  [Menu, Play, GameOver]
}


let game = new Phaser.Game(config);

let playerX = 100;
//the y distance between lanes
let differenceY = game.config.height/4;
let virusSpeed = -250;
let platformSpeed = 4;
let keyUP, keyDOWN, keyR;