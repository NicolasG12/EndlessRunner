class GameOver extends Phaser.Scene {
   constructor() {
      super("gameOver");
   }

   create() {
      this.background = this.sound.add('main');
      this.background.setLoop(true);
      this.background.play();
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keySPACE.on('down', (key, event) => {
         this.background.stop();
         this.sound.play('select');
         this.scene.start("playScene");
      })
      this.add.text(game.config.width/2, game.config.height/2, "Game Over!\nPress Space to restart");
   }
}