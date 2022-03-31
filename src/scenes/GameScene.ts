import TextInput, { InputOption } from "pixi-drawable-textinput";
import { AnimatedSprite, Container, Loader, Sprite, Texture } from "pixi.js";
import { IScene, Manager } from "./../manager/Manager";
import { MenuScene } from "./MenuScene";


export class GameScene extends Container implements IScene{
    private clampy: Sprite;
    private dragonite: Sprite
    private clampyVelocity: number;
    private dragVelocity: number;

    private dino: Sprite;
    private animatedDino: AnimatedSprite;
    private back: Sprite;

    private pauseUp: Texture;
    private pauseDown: Texture;
    private pauseButton: Sprite;

    private isdown: Boolean;

    constructor() {
        super();
        this.isdown = false;
        const dinoframe:Array<String> = [
            "Run (1).png",
            "Run (2).png",
            "Run (3).png",
            "Run (4).png",
        ]
        this.animatedDino = new AnimatedSprite(dinoframe.map((stringy:any) => Texture.from(stringy)));
        
        this.animatedDino.position.set(100,300)
        this.animatedDino.width=130;
        this.animatedDino.height = 100;
        this.addChild(this.animatedDino);
        this.animatedDino.animationSpeed = 0.09;
        this.animatedDino.play();
        this.animatedDino.onFrameChange = this.onClampyFrameChange.bind(this);

        const defaultIcon = "url('target.png'), auto";
        // Manager.app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
           
        //loading the assets from where...?
        //it was laoded in loaderscene.ts, loaderscene calls managerscene.ts
        //...and then?
        this.clampy = Sprite.from("clamper");
        this.clampy.anchor.set(0.5);
        this.clampy.position.set(Manager.width/2, Manager.height/2);
        this.clampyVelocity = 5;

        this.dragonite = Sprite.from("dragonite");
        this.dragonite.anchor.set(0.5);
        this.dragonite.position.set(Manager.width/2, Manager.height/2);
        // this.addChild(this.dragonite);

        this.dino = Sprite.from("dino");
        this.dino.position.set(Manager.width/2, Manager.height/2);
        this.dino.anchor.set(0.3);
        // this.dino.scale.x= -1;


        this.dragVelocity = 7;

        // this.addChild(this.larg1, this.larg2, this.larg3);
        // this.addChild(this.clampy);
        // this.addChild(this.dino);
        
        this.back = Sprite.from("back");
        this.back.interactive = true;
        this.back.buttonMode = true;
        this.addChild(this.back)
        
        this.pauseUp = Texture.from("pauseUp");
        this.pauseDown = Texture.from("pauseDown");

        this.pauseButton = new Sprite(this.pauseUp);
        this.pauseButton.anchor.set(0.5)
        this.pauseButton.position.set(600, 50);
        this.pauseButton.width=40;
        this.pauseButton.height=40;
        this.pauseButton
        .on('pointertap', this.onButtonDown.bind(this))
        // .on('pointerup', this.onButtonUp.bind(this));
        this.addChild(this.pauseButton);
        
        this.pauseButton.interactive = true;
        this.pauseButton.buttonMode = true;
        
        this.back.on('pointertap', () => {
            Manager.changeScene(new MenuScene());
        })

        let option = new InputOption();
        option.multiLine = true;
        option.style = { fontSize: 12 };
        option.value = "A simple text input";
        let input = new TextInput(option);
        input.position.set(100, 200)
        this.addChild(input);
        console.log(option.value)


        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

        
    }
    private onClampyFrameChange(currentFrame:any): void {
        // console.log(currentFrame)
    }
    private onButtonDown(){
        this.isdown = !this.isdown;
        if (this.isdown){
            this.pauseButton.texture = this.pauseDown;
            this.animatedDino.stop();
        } else {
            this.pauseButton.texture = this.pauseUp;
            this.animatedDino.play();
        }
    }
    // private onButtonUp(): void{
    //     if(this.isdown==false){
    //         this.pauseButton.texture = this.pauseUp;
    //         this.alpha = 1;
    //         this.isdown = true;
    //         console.log(this.pauseButton.texture);
    //     }
    // }
    // private setup(){
    //     const textures = [];
    //     for(let i=1; i<9; i++) {
    //         console.log(i)
    //         const texture = Texture.from(`Run (${i}).png`);
    //         textures.push(texture);
    //         console.log(textures)
    //     }
    //     const drag = new AnimatedSprite(textures);
    //     drag.position.set(800, 300);
    //     drag.scale.set(2,2);
    //     Manager.app.stage.addChild(drag);
    //     drag.play();
    //     drag.animationSpeed = 0.1;
    // }
    private onKeyDown(e: KeyboardEvent): void {
        // console.log(e)
        let temp: boolean = false;
        if(e.code === 'KeyW'){
            this.dino.y = this.dino.y-10
        }
        if(e.code === 'KeyS'){
            this.dino.y = this.dino.y+10
        }
        if(e.code === 'KeyA'){
            this.dino.x = this.dino.x-10
            this.dino.scale.x = -1;
            this.dino.width = 220;
            this.dino.height = 180;
        }
        if(e.code === 'KeyD'){
            this.dino.x = this.dino.x+10
            this.dino.scale.x = +1;
            this.dino.width = 220;
            this.dino.height = 180;
        }
        if(e.code === 'Escape' && temp === false){
            Manager.app.ticker.stop();
            // temp = true
            console.log(temp);
        }
        if(e.code === 'Space'){
            Manager.app.ticker.start();
            temp = true
            console.log(temp);
        }        
    }
    private onKeyUp(e: KeyboardEvent): void {
        // console.log(e)
        
    }

    public update(framesPassed: number): void {
        this.clampy.x = this.clampy.x + this.clampyVelocity* framesPassed;
        this.dragonite.y += this.dragVelocity*framesPassed;
        if(this.clampy.x>Manager.width){
            this.clampy.x = Manager.width;
            this.clampyVelocity = -this.clampyVelocity
        }
        // if(this.dragonite.y>Manager.width)
        //     this.dragonite.y = Manager.width;
        //     this.dragVelocity = -this.dragVelocity
        // }

        if (this.clampy.x < 0) {
            this.clampy.x = 0;
            this.clampyVelocity = -this.clampyVelocity;
        }
        // if (this.dragonite.y < 0) {
        //     this.dragonite.y = 0;
        //     this.dragVelocity = -this.dragVelocity;
        // }
        // private onKeyDown(e: KeyboardEvent): void {
        //     console.log(e)
        //     if(e.code === 'KeyW'){
        //         this.dino.x = this.dino.x+1
        //     }
        // }
    }
}