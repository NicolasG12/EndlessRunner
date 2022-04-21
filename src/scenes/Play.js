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
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        this.player1 = new Email(this, playerX, game.config.height/2 - 100, 'email').setOrigin(0, 0);
        //group for the enemy viruses
        this.viruses = this.physics.add.group();
        //group for the platforms
        this.platforms = this.physics.add.staticGroup();

        // this.platform = this.physics.add.image(game.config.width/2, game.config.height/2, 'platform');
        // this.platform.body.allowGravity = false;
        // this.platform.setImmovable(true);
        // this.platform.setVelocityX(50);
        //set the collision groups
        this.physics.add.collider(this.player1, this.platform);
        //add input keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        this.player1.update();
        this.background.tilePositionX += 4;
    }
}