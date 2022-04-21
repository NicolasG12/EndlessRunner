class Email extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.y -= differenceY;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.y += differenceY;
        }
    }
}