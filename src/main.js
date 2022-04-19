let config = {
   type: Phaser.AUTO,
   width: 640,
   height: 480,
   scene: [Menu, Play],
   backgroundColor: 0x0004E3
}

let game = new Phaser.Game(config);