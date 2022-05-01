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
      this.add.tileSprite(0, 0, game.config.width, game.config.height, 'endscreen').setScale(2);
      keySPACE.on('down', (key, event) => {
         this.background.stop();
         this.sound.play('select');
         this.scene.start("playScene");
      })
      this.add.text(game.config.width/2, game.config.height/2, "Game Over!\nPress Space to restart");
   }
}