class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('menu', './assets/Main Menu Draft.png');
        this.load.audio('main', './assets/mainSong.wav');
        this.load.audio('select', './assets/select.wav');
    }

    create() {
        this.background = this.sound.add('main');
        this.background.setLoop(true);
        this.background.play();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menu').setOrigin(0, 0);
        keySPACE.on('down', (key, event) => {
            this.background.stop();
            this.sound.play('select');
            this.scene.stop("menuScene");
            this.scene.start('playScene');
        })
    }
}