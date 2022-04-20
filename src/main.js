let config = {
   type: Phaser.AUTO,
   width: 640,
   height: 480,
   scene:  [Menu, Play]
}

let playerX = 100;

let game = new Phaser.Game(config);