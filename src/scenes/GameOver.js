class GameOver extends Phaser.Scene {
   constructor() {
      super("gameOver");
   }

   create() {
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keySPACE.on('down', (key, event) => {
         this.scene.start("playScene");
      })
      this.add.text(game.config.width/2, game.config.height/2, "Game Over!\nPress Space to restart");
   }
}