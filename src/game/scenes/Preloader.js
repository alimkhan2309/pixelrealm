import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor () {
        super('Preloader');
    }

    init () {
    }

    preload () {
        
    }

    create () {
        console.log("Changing scene to MainMenu");

        this.scene.start('MainMenu');
    }
}

