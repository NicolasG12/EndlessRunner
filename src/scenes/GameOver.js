class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    create() {
        this.add.text(20, 20, "Game Over!");
        //this.scene.start("playScene");
    }
}