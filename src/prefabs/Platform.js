class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setImmovable(true);
        this.moveSpeed = speed;
    }

    update() {
        //move platform left
        // this.x -= this.moveSpeed;
        // wraps around from left edge to right edge
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width + game.config.width/2;
    }
}