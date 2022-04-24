class Email extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setPushable(false);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyUP) && this.y > 110) {
            this.y -= differenceY;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.y < 390) {
            this.y += differenceY;
        }
    }
}