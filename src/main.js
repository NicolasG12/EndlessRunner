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

//the y distance between lanes
let differenceY = game.config.height/4;
let score = 0;
let keyUP, keyDOWN, keySPACE;