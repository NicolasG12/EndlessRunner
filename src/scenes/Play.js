class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/tempBackground.png');
        this.load.image('platformTile', './assets/tempPlatTile.png');
        this.load.image('shield', './assets/Shield Draft.png');
        this.load.spritesheet('virus', './assets/Skull Animation Draft.png', { frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 4 });
        this.load.spritesheet('email', './assets/Mail-E Animation Draft.png', { frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 2 });
    }

    create() {
        // Variable Initialization
        this.tileSize = 20;
        this.spawnTime = 1000;
        this.scrollSpeed = 4;

        // Initialize Background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);

        // Initialize Platform Group
        this.platforms = this.add.group();

        // Initialize Top Platform
        for (let i = 0; i < game.config.width; i += this.tileSize) {
            let topTile = this.physics.add.sprite(i, game.config.height / 4 - this.tileSize, 'platformTile').setOrigin(0, 0);
            topTile.body.immovable = true;
            topTile.body.allowGravity = false;
            this.platforms.add(topTile);
        }

        // Initialize Middle Platform
        for (let i = 0; i < game.config.width; i += this.tileSize) {
            let midTile = this.physics.add.sprite(i, game.config.height / 2 - this.tileSize, 'platformTile').setOrigin(0, 0);
            midTile.body.immovable = true;
            midTile.body.allowGravity = false;
            this.platforms.add(midTile);
        }

        // Initialize Middle Platform
        for (let i = 0; i < game.config.width; i += this.tileSize) {
            let botTile = this.physics.add.sprite(i, ((game.config.height / 4) * 3) - this.tileSize, 'platformTile').setOrigin(0, 0);
            botTile.body.immovable = true;
            botTile.body.allowGravity = false;
            this.platforms.add(botTile);
        }

        // Initialize Player
        this.player1 = new Email(this, playerX, game.config.height / 2 - 68, 'email').setOrigin(0, 0);
        // Create an animation for the player
        this.anims.create({
            key: 'emailAnimation',
            frames: this.anims.generateFrameNumbers('email', { start: 0, end: 2, first: 0 }),
            frameRate: 15,
            repeat: -1
        });
        this.player1.play('emailAnimation');


        // Group for the enemy viruses
        this.viruses = this.physics.add.group();
        this.specialViruses = this.physics.add.group();
        // Create an animation for the virus
        this.anims.create({
            key: 'virusAnimation',
            frames: this.anims.generateFrameNumbers('virus', { start: 0, end: 4, first: 0 }),
            frameRate: 15,
            repeat: -1
        });

        // Spawn enemies every second
        setInterval(() => {
            this.addVirus(this.viruses, 'virus');
        }, this.spawnTime);
        //spawn a special type of enemy every 2.5 seconds
        setInterval(() => {
            this.addVirus(this.specialViruses, 'shield');
        }, this.spawnTime * 2.5)
        //have these enemies change lanes at an interval of 2 seconds
        setInterval(() => {
            this.specialViruses.getChildren().forEach((virus) => {
                if(virus.y < game.config.height/4) {
                    virus.y += differenceY;
                } else if (virus.y > game.config.height/2) {
                    virus.y -= differenceY;
                } else {
                    let rand = Math.ceil(Math.random() * 2);
                    switch(rand) {
                        case 1:
                            virus.y -= differenceY;
                        case 2:
                            virus.y += differenceY;
                        default:
                            break;
                    }
                }
            }, this)
        }, this.spawnTime *2);
        
        // Collision
        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.viruses, this.platforms);
        this.physics.add.collider(this.specialViruses, this.platforms);
        this.physics.add.overlap(this.player1, this.viruses, this.playerHit, null, this);
        this.physics.add.overlap(this.player1, this.specialViruses, this.playerHit, null, this);

        // Add input keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    addVirus(virusGroup, virusType) {
        let lane = (Math.floor(Math.random() * 3));
        let virus = this.physics.add.sprite(game.config.width, (lane * differenceY) + 85, virusType).setOrigin(0, 0);
        virusGroup.add(virus);
        // virus.play('virusAnimation');
        virusGroup.setVelocityX(virusSpeed);
    }

    update() {
        // Update Background
        this.background.tilePositionX += this.scrollSpeed;
        this.platforms.getChildren().forEach((tile) => {
            tile.setX(tile.x - this.scrollSpeed);
            this.physics.world.wrap(tile, 0);
        }, this);

        // Update Player
        this.player1.update();

        // Update Viruses
        this.viruses.getChildren().forEach((virus) => {
            if (virus.x <= 0 - virus.width) {
                virus.destroy();
            }
        }, this);
    }

    // Player Hit Function
    playerHit(player, virus) {
        this.viruses.killAndHide(virus);
        this.viruses.remove(virus);

        // Go to Game Over Screen
        this.scene.start("gameOver");
        console.log("Game over");
    }

}

