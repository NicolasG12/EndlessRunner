class Email extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setPushable(false);
    }

    update() {
        // If the player is below the top lane, they can move up
        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.y > game.config.height/4) {
            this.y -= differenceY;
        }
        // If the player is above the bottom lane, they can move down
        if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.y < game.config.height/2) {
            this.y += differenceY;
        }
    }
}