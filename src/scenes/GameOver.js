class GameOver extends Phaser.Scene {
   constructor() {
      super("gameOver");
   }

   preload() {
      this.load.image('endscreen', './assets/01_end_screen.png')
   }

   create() {
      this.background = this.sound.add('main');
      this.background.setLoop(true);
      this.background.play();
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.add.tileSprite(0, 0, game.config.width, game.config.height, 'endscreen').setOrigin(0,0);
      keySPACE.on('down', (key, event) => {
         this.background.stop();
         this.sound.play('select');
         this.scene.start("playScene");
      })
      let gameOverConfig = {
         fontFamily: 'Courier',
         fontSize: '20px',
         fontStyle: 'bold',
         color: '#FFFFFF',
         align: 'left'
     }
      this.add.text(25, game.config.height - 200, "Score: " + score + "\nPress 'Space' to restart", gameOverConfig);
   }
}