import { Container, Graphics, Loader, Sprite } from "pixi.js";
import { assets } from "./assets";
import { GameScene } from "./GameScene";
import { IScene, Manager } from "./Manager";
import { MenuScene } from "./MenuScene";

export class LoaderScene extends Container implements IScene{

    //make loader graphics
    private loaderBar: Container;
    private loaderBarBorder: Graphics;
    private loaderBarFill: Graphics;

    private splash: Sprite;

    constructor(){
        super();
        
        //loader graphics
        const loaderBarWidth = Manager.width*0.8;
        //loader filler
        this.loaderBarFill = new Graphics();
        this.loaderBarFill.beginFill(0x008800, 1)
        .drawRect(0,0, loaderBarWidth, 50)
        .endFill()
        .scale.x = 0;
        
        this.loaderBarBorder = new Graphics();
        this.loaderBarBorder.lineStyle(10,0x0, 1)
        .drawRect(0,0, loaderBarWidth, 50);
        
        this.splash = Sprite.from("./splashscreen.png");
        // this.splash.position.set(Manager.width/2, Manager.height/2);
        this.splash.width = Manager.width;
        this.splash.height = Manager.height;

        this.loaderBar = new Container();
        this.loaderBar.addChild(this.loaderBarFill, this.loaderBarBorder);
        this.loaderBar.position.set((Manager.width - this.loaderBar.width)/2, (Manager.height - this.loaderBar.height)/2);
        this.addChild( this.splash, 
            // this.loaderBar,
              );
        
        Loader.shared.add(assets);
        
        Loader.shared.onProgress.add(this.downloadProgress, this);
        Loader.shared.onComplete.once(this.gameLoaded, this);

        Loader.shared.load();
    }

    private downloadProgress(loader: Loader): void {
        const progressRatio = loader.progress/100;
        this.loaderBarFill.scale.x = progressRatio;
        // console.log(progressRatio)
    }
    private gameLoaded(): void {
        var delayInMilliseconds = 1000; //1 second

        setTimeout(function() {
            Manager.changeScene(new MenuScene());
        //your code to be executed after 1 second
        }, delayInMilliseconds);
    }
    public update(framesPassed: number): void {
        // To be a scene we must have the update method even if we don't use it.
    }
}