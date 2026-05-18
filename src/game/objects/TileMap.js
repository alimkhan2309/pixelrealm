import * as Phaser from 'phaser';
import { EventBus } from '../EventBus';
import { Tile } from './Tile';

export class TileMap extends Phaser.GameObjects.Container
{
    constructor (scene, x, y, mapSize)
    {
        super(scene, x, y);
        this.scene = scene;
        this.mapSize = mapSize;
        this.tile_width = 32; //57
        this.tile_height = 32; //41
        
        this.createTileMap();
        this.scene.add.existing(this);
    }



    createTileMap ()
    {
        // Position the tilemap container
        this.setPosition(this.x, this.y);
    }

    drawTileMap()
    {//TODO: infinite looop?
        const tileQueue = [];
        // Line of tiles let j = 0; j < this.mapSize[1]; j++
        for (let j = 0; j < this.mapSize[1]; j++) { // X AXIS
            for (let i = 0; i < this.mapSize[0]; i++) {
                const xOffset = j % 2 == 0 ? 25 : 0;
                let x = i * (this.tile_width + 16);
                let y = j * (this.tile_height - 16);

                if (j % 2 == 0) {
                    x += xOffset;
                }
                tileQueue.push({ x, y, i, j });
                // this.scene.add.image(x, y, "tiles");
                // //DEBUG:
                // this.scene.add.text(x, y, `${i},${j}`, {
                //     fontFamily: "Arial",
                //     fontSize: 8,
                //     color: "#00000",
                // });
            }
        }
        console.log(`Drawing: ${tileQueue}`);
        this.scene.time.addEvent({
            delay: 100, // <--- Delay in milliseconds between each tile (adjust this to change speed!)
            callback: () => {
                // If the queue is empty, stop
                if (tileQueue.length === 0) return;

                // Take the first tile data out of the queue
                const tile = tileQueue.shift();

                // Draw the tile image
                this.scene.add.image(tile.x, tile.y, "tiles");

                // Draw the debug text (Fixed the hex color string typo here too!)
                this.scene.add.text(tile.x, tile.y, `${tile.i},${tile.j}`, {
                    fontFamily: "Arial",
                    fontSize: 8,
                    color: "#000000",
                });
            },
            callbackScope: this,
            repeat: tileQueue.length - 1, // Run exactly enough times to empty the queue
        });
    }
    
}