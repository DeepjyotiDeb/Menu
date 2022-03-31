import { Container, Sprite, Texture } from "pixi.js";
import { IScene } from "../../manager/Manager";


export class PauseMenu extends Container implements IScene {
    private temp: Texture;
    private tempMenu: Sprite;
    constructor() {
        super();

        this.temp = Texture.from("tempscreen");
        this.tempMenu = Sprite.from(this.temp)
        this.tempMenu.anchor.set(0.5);
        this.tempMenu.scale.set(0.5, 0.5);
        this.tempMenu.position.set(320, 250)
        this.addChild(this.tempMenu);
    }
    public update(framesPassed: number): void {

    } 
}