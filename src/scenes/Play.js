class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/tempBackground.png');
        this.load.image('email', './assets/01_player.png');
        this.load.image('platform', './assets/tempPlatform.png');
        this.load.image('virus', './assets/01_enemy.png');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        //add input keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        //create the player
        this.player1 = new Email(this, playerX, game.config.height/2 - 100, 'email').setOrigin(0, 0);
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
        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.virusGroup, this.platforms);
        this.physics.add.overlap(this.player1, this.virusGroup, this.playerHit, null, this);
    }
    addVirus(posY) {
        let virus;
        console.log(this.virusPool.getLength());
        if(this.virusPool.getLength()) {
            virus = this.virusPool.getFirst();
            virus.x = game.config.width - 100;
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
        if(Math.floor(Math.random() * 100) == 17) {
            let lane = Math.floor(Math.random() * 3);
            this.addVirus(lane * differenceY);
        }
        this.player1.update();
        this.background.tilePositionX += 4;
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