class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/tempBackground.png');
        this.load.image('email', './assets/01_tempPlayer.png');
        this.load.image('platform', './assets/tempPlatform.png');
        this.load.image('virus', './assets/01_tempVirus.png');
    }

    create() {
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

        //set the collision groups
        this.physics.add.collider(this.player1, this.platformTopGroup);
        this.physics.add.collider(this.player1, this.platformMidGroup);
        this.physics.add.collider(this.player1, this.platformBotGroup);
        this.physics.add.collider(this.virusGroup, this.platformTopGroup);
        this.physics.add.collider(this.virusGroup, this.platformMidGroup);
        this.physics.add.collider(this.virusGroup, this.platformBotGroup);
        this.physics.add.overlap(this.player1, this.virusGroup, this.playerHit, null, this);
    }

    addVirus(posY) {
        let virus;
        // if(this.virusPool.getLength()) {
        //     virus = this.virusPool.getFirst();
        //     virus.x = game.config.width;
        //     virus.y = posY;
        //     console.log(virus.y);
        //     virus.active = true;
        //     virus.visible = true;
        //     this.virusPool.remove(virus);
        // }
        // else {
        virus = new Virus(this, game.config.width + 100, posY, 'virus').setOrigin(0, 0);
        this.virusGroup.add(virus);
        //}
        this.virusGroup.setVelocityX(virusSpeed);
    }

    update() {
        // Update Background
        this.background.tilePositionX += 4;
        // Update Player
        this.player1.update();
        
        if(Math.floor(Math.random() * 100) == 17) {
            let lane = (Math.floor(Math.random() * 3))
            this.addVirus(lane * differenceY + 90);
        }
        this.virusGroup.getChildren().forEach((virus) => {
            if(virus.x <= 0 - virus.width) {
                this.virusGroup.killAndHide(virus);
                this.virusGroup.remove(virus);
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
        // this.scene.start("gameOver");
        this.virusGroup.killAndHide(virus);
        this.virusGroup.remove(virus);
        console.log("Game over");
    }

}

