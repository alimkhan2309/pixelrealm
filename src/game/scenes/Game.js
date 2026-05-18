import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { TileMap } from '../objects/TileMap';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload () {
        this.load.image("tiles", "assets/images/tile5.png");
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x1e79d4);
        this.cameras.main.setZoom(2).centerOn(128, 0);

        // this.add.image(512, 384, 'background').setAlpha(0.5);
        // var rect = this.add.rectangle(0, 0, 57, 41, 0x000000).setAlpha(0.5);
        this.tileMap = new TileMap(this, 32, 32, [5,5]);
        this.tileMap.drawTileMap();
        
        EventBus.emit('current-scene-ready', this);
    }
    
    update ()
    {
        // Game loop logic goes here

    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}




