class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/tempBackground.png');
        this.load.image('email', './assets/pixil-frame-0.png');
        this.load.image('platform', './assets/tempPlatform.png');
    }

    create() {
        // Initialize Background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        // Initialize Player
        this.player1 = new Email(this, playerX, game.config.height / 2 - 100, 'email').setOrigin(0, 0);
        // Initialize Top Platforms
        this.platformTop1 = new Platform(this, 0, game.config.height / 4, 'platform', 0, 4).setOrigin(0, 0);
        this.platformTop2 = new Platform(this, game.config.width / 2, game.config.height / 4, 'platform', 0, 4).setOrigin(0, 0);
        this.platformTop3 = new Platform(this, game.config.width, game.config.height / 4, 'platform', 0, 4).setOrigin(0, 0);
        this.platformTop4 = new Platform(this, game.config.width + (game.config.width / 2), game.config.height / 4, 'platform', 0, 4).setOrigin(0, 0);

        this.physics.add.collider(this.player1, this.platformTop1);
        this.physics.add.collider(this.player1, this.platformTop2);
        this.physics.add.collider(this.player1, this.platformTop3);
        this.physics.add.collider(this.player1, this.platformTop4);
        // Initialize Middle Platforms
        this.platformMid1 = new Platform(this, 0, game.config.height / 2, 'platform', 0, 4).setOrigin(0, 0);
        this.platformMid2 = new Platform(this, game.config.width / 2, game.config.height / 2, 'platform', 0, 4).setOrigin(0, 0);
        this.platformMid3 = new Platform(this, game.config.width, game.config.height / 2, 'platform', 0, 4).setOrigin(0, 0);
        this.platformMid4 = new Platform(this, game.config.width + (game.config.width / 2), game.config.height / 2, 'platform', 0, 4).setOrigin(0, 0);

        this.physics.add.collider(this.player1, this.platformMid1);
        this.physics.add.collider(this.player1, this.platformMid2);
        this.physics.add.collider(this.player1, this.platformMid3);
        this.physics.add.collider(this.player1, this.platformMid4);
        // Initialize Bot Platforms
        this.platformBot1 = new Platform(this, 0, (game.config.height / 4) * 3, 'platform', 0, 4).setOrigin(0, 0);
        this.platformBot2 = new Platform(this, game.config.width / 2, (game.config.height / 4) * 3, 'platform', 0, 4).setOrigin(0, 0);
        this.platformBot3 = new Platform(this, game.config.width, (game.config.height / 4) * 3, 'platform', 0, 4).setOrigin(0, 0);;
        this.platformBot4 = new Platform(this, game.config.width + (game.config.width / 2), (game.config.height / 4) * 3, 'platform', 0, 4).setOrigin(0, 0);

        this.physics.add.collider(this.player1, this.platformBot1);
        this.physics.add.collider(this.player1, this.platformBot2);
        this.physics.add.collider(this.player1, this.platformBot3);
        this.physics.add.collider(this.player1, this.platformBot4);
        //add input keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        // Update Background
        this.background.tilePositionX += 4;
        // Update Player
        this.player1.update();
        // Update Top Platforms
        this.platformTop1.update();
        this.platformTop2.update();
        this.platformTop3.update();
        this.platformTop4.update();
        // Update Middle Platforms
        this.platformMid1.update();
        this.platformMid2.update();
        this.platformMid3.update();
        this.platformMid4.update();
        // Update Bottom Platforms
        this.platformBot1.update();
        this.platformBot2.update();
        this.platformBot3.update();
        this.platformBot4.update();
    }
}