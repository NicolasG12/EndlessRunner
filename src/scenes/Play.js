class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/tempBackground.png');
        this.load.image('platform', './assets/tempPlatform.png');
        this.load.spritesheet('virus', './assets/Skull Animation Draft.png', {frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 4});
        this.load.spritesheet('email', './assets/Mail-E Animation Draft.png', {frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 2});
    }

    create() {
        this.spawnTime = 1000;
        // Initialize Background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);

        // Initialize Player
        this.player1 = new Email(this, playerX, game.config.height / 2 - 100, 'email').setOrigin(0, 0);

        // Initialize Top Platforms

        this.platformTopGroup = this.physics.add.group({
            classType: Platform,
            key: 'platform',
            repeat: 3,
            setXY: {x: 0, y: game.config.height/4, stepX: game.config.width/2},
            immovable: true,
            allowGravity: false,
            velocityX: -200
        });
        this.platformMidGroup = this.physics.add.group({
            classType: Platform,
            key: 'platform',
            repeat: 3,
            setXY: {x: 0, y: game.config.height/2, stepX: game.config.width/2},
            immovable: true,
            allowGravity: false,
            velocityX: -200
        });
        this.platformBotGroup = this.physics.add.group({
            classType: Platform,
            key: 'platform',
            repeat: 3,
            setXY: {x: 0, y: (game.config.height / 4) * 3, stepX: game.config.width/2},
            immovable: true,
            allowGravity: false,
            velocityX: -200
        });


        //add input keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //group for the enemy viruses
        this.virusGroup = this.physics.add.group();


        // this.virusPool = this.physics.add.group();

        //create an animation for the virus
        this.anims.create({
            key: 'virusAnimation',
            frames: this.anims.generateFrameNumbers('virus', {start: 0, end: 4, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'emailAnimation',
            frames: this.anims.generateFrameNumbers('email', {start: 0, end: 4, first: 0}),
            frameRate: 15,
            repeat: -1
        })

        //set the collision groups
        this.physics.add.collider(this.player1, this.platformTopGroup);
        this.physics.add.collider(this.player1, this.platformMidGroup);
        this.physics.add.collider(this.player1, this.platformBotGroup);
        this.physics.add.collider(this.virusGroup, this.platformTopGroup);
        this.physics.add.collider(this.virusGroup, this.platformMidGroup);
        this.physics.add.collider(this.virusGroup, this.platformBotGroup);
        this.physics.add.overlap(this.player1, this.virusGroup, this.playerHit, null, this);

        //spawn enemies every second
        setInterval( () => {
            let lane = (Math.floor(Math.random() * 3))
            this.addVirus(lane * differenceY + 90);
        }, this.spawnTime);
        this.player1.play('emailAnimation');

    }

    addVirus(posY) {
        let virus;
        virus = new Virus(this, game.config.width, posY, 'virus').setOrigin(0, 0);
        this.virusGroup.add(virus);
        this.virusGroup.setVelocityX(virusSpeed);
        virus.play('virusAnimation');
    }

    update() {
        // Update Background
        this.background.tilePositionX += 4;
        // Update Player
        this.player1.update();
        this.virusGroup.getChildren().forEach((virus) => {
            if(virus.x <= 0 - virus.width) {
                virus.destroy();
            }
        }, this);

        this.platformTopGroup.getChildren().forEach((platform) => {
            platform.update();
        }, this);
        this.platformMidGroup.getChildren().forEach((platform) => {
            platform.update();
        }, this);
        this.platformBotGroup.getChildren().forEach((platform) => {
            platform.update();
        }, this) 
    }

    playerHit(player, virus) {
        this.virusGroup.killAndHide(virus);
        this.virusGroup.remove(virus);
        // Go to Game Over Screen
        this.scene.start("gameOver");
        console.log("Game over");
    }

}

