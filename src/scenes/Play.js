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
        this.player1 = new Email(this, playerX, game.config.height / 2 - 50, 'email').setOrigin(0, 0);
        // Initialize Top Platforms

        this.platformTop = [];
        this.platformTop1 = new Platform(this, 0, game.config.height / 4, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformTop2 = new Platform(this, game.config.width / 2, game.config.height / 4, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformTop3 = new Platform(this, game.config.width, game.config.height / 4, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformTop4 = new Platform(this, game.config.width + (game.config.width / 2), game.config.height / 4, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformTop.push(this.platformTop1, this.platformTop2, this.platformTop3, this.platformTop4);

        this.physics.add.collider(this.player1, this.platformTop);
        // this.physics.add.collider(this.player1, this.platformTop2);
        // this.physics.add.collider(this.player1, this.platformTop3);
        // this.physics.add.collider(this.player1, this.platformTop4);
        // Initialize Middle Platforms
        this.platformMid = [];
        this.platformMid1 = new Platform(this, 0, game.config.height / 2, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformMid2 = new Platform(this, game.config.width / 2, game.config.height / 2, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformMid3 = new Platform(this, game.config.width, game.config.height / 2, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformMid4 = new Platform(this, game.config.width + (game.config.width / 2), game.config.height / 2, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformMid.push(this.platformMid1, this.platformMid2, this.platformMid3, this.platformMid4);

        this.physics.add.collider(this.player1, this.platformMid);
        // this.physics.add.collider(this.player1, this.platformMid2);
        // this.physics.add.collider(this.player1, this.platformMid3);
        // this.physics.add.collider(this.player1, this.platformMid4);
        // Initialize Bot Platforms
        this.platformBot = [];
        this.platformBot1 = new Platform(this, 0, (game.config.height / 4) * 3, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformBot2 = new Platform(this, game.config.width / 2, (game.config.height / 4) * 3, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformBot3 = new Platform(this, game.config.width, (game.config.height / 4) * 3, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformBot4 = new Platform(this, game.config.width + (game.config.width / 2), (game.config.height / 4) * 3, 'platform', 0, platformSpeed).setOrigin(0, 0);;
        this.platformBot.push(this.platformBot1, this.platformBot2, this.platformBot3, this.platformBot4);


        this.physics.add.collider(this.player1, this.platformBot);
        
        // this.physics.add.collider(this.player1, this.platformBot2);
        // this.physics.add.collider(this.player1, this.platformBot3);
        // this.physics.add.collider(this.player1, this.platformBot4);
        //add input keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //group for the enemy viruses
        this.virusGroup = this.physics.add.group({
            removeCallback: function(virus) {
                virus.scene.virusPool.add(virus);
            }
        });


        this.virusPool = this.physics.add.group({
            removeCallback: function(virus) {
                virus.scene.virusGroup.add(virus);
            }
        });

        //set the collision groups
        this.physics.add.collider(this.virusGroup, this.platformTop);
        this.physics.add.collider(this.virusGroup, this.platformMid);
        this.physics.add.collider(this.virusGroup, this.platformBot);
        this.physics.add.overlap(this.player1, this.virusGroup, this.playerHit, null, this);
    }

    addVirus(posY) {
        let virus;
        console.log(this.virusPool.getLength());
        if(this.virusPool.getLength()) {
            virus = this.virusPool.getFirst();
            virus.x = game.config.width;
            virus.y = posY;
            virus.active = true;
            virus.visible = true;
            this.virusPool.remove(virus);
        }
        else {
            virus = new Virus(this, game.config.width, posY, 'virus').setOrigin(0, 0);
            virus.setImmovable(true);
            this.virusGroup.add(virus);
        }
        this.virusGroup.setVelocityX(virusSpeed);
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
        let rand = Math.floor(Math.random() * 300);
        if(rand < 3) {
            this.addVirus(rand * differenceY + 100);
        }
        this.virusGroup.getChildren().forEach((virus) => {
            if(virus.x <= 0 - virus.width) {
                this.virusGroup.killAndHide(virus);
                this.virusGroup.remove(virus);
            }
        }, this);
    }

    playerHit(player, virus) {
        // this.scene.start("gameOver");
        this.virusGroup.killAndHide(virus);
        this.virusGroup.remove(virus);
        console.log("Game over");
    }

}

