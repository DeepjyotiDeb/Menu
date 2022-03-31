import { Container, Sprite } from "pixi.js";
import { GameScene } from "./GameScene";
import { IScene, Manager } from "../manager/Manager";



export class MenuScene extends Container implements IScene{
    private startgame: Sprite;
    private bgimg: Sprite;

    constructor() {
        super();
        this.startgame = Sprite.from("startgame");
        this.startgame.anchor.set(0.5);
        this.startgame.position.set(Manager.width/2, Manager.height/2);
        this.startgame.interactive = true;
        this.startgame.buttonMode = true;
        
        this.bgimg = Sprite.from("bgimg");
        this.bgimg.anchor.set(0.5);
        this.bgimg.position.set(Manager.width/2, Manager.height/2);

        this.addChild(this.bgimg, this.startgame);

        this.startgame.on('pointerdown', function() {
            Manager.changeScene(new GameScene());
            
        })
    }

    public update(framesPassed: number): void {

    }
    
}