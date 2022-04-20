let config = {
   type: Phaser.AUTO,
   width: 640,
   height: 480,
   scene:  [Menu, Play]
}


let game = new Phaser.Game(config);

let playerX = 100;
//the y distance between lanes
let differenceY = 75;
let keyUP, keyDOWN, keyR;