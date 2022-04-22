class Virus extends Phaser.Physics.Arcade.Sprite {
   constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
         scene.add.existing(this);
         scene.physics.add.existing(this);

   }

   update() {
      if (this.x <= 0 - this.width) {
         this.x = game.config.width;
      }
   }

}