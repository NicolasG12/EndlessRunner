class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/tempBackground.png');
        this.load.image('email', './assets/tempPlayer.png');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        this.player1 = new Email(this, playerX, game.config.height/2, 'email').setOrigin(0, 0);
    }

    update() {
        this.background.tilePositionX += 4;
    }
}