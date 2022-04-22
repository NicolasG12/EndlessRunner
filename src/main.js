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
   scene:  [Menu, Play]
}


let game = new Phaser.Game(config);

let playerX = 100;
//the y distance between lanes
let differenceY = 75;
let keyUP, keyDOWN, keyR;