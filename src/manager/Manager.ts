import { Application, DisplayObject } from "pixi.js";

export class Manager {
private constructor() {/*purely static will not have constructor*/}
        
        //storing variables of our game
        //declaring this as public makes it unuseable?
        public static app: Application;
        private static currentScene: IScene;

        //width and height are read-only after creation
        private static _width: number;
        private static _height: number;

        //with getters these variables become read-only
        public static get width(): number {
            return Manager._width;
        }
        public static get height(): number {
            return Manager._height;
        }

        //this starts the entire thingy
        public static initialize(width: number, height: number, background: number): void {

            //storing width and height
            Manager._width = width;
            Manager._height = height;

            //create our app
            Manager.app = new Application({
                view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
                resolution: window.devicePixelRatio || 1,
                autoDensity: true,
                backgroundColor: background,
                width: width,
                height: height
            });
            // const defaultIcon = "url('target.png'), auto";
            // Manager.app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
            //add the ticker
            Manager.app.ticker.add(Manager.update)

            //listening to the browser for changing screen size
            window.addEventListener("resize", Manager.resize);
            //calling it noramlly to make sure the correct size was set
            Manager.resize();
        }
        public static resize():void {
            const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            // uniform scale for the game
            const scale = Math.min(screenWidth/Manager.width, screenHeight/Manager.height);

            //uniformly enlarged size
            const enlargedWidth = Math.floor(scale*Manager.width)/1.2;
            const enlargedHeight = Math.floor(scale*Manager.height)/1.2;

            //margins for centering the game
            const horizontalMargin = (screenWidth - enlargedWidth)/2;
            const verticalMargin = (screenHeight - enlargedHeight)/2;

            Manager.app.view.style.width = `${enlargedWidth}px`;
            Manager.app.view.style.height = `${enlargedHeight}px`;
            Manager.app.view.style.marginLeft = Manager.app.view.style.marginRight = `${horizontalMargin}px`;
            Manager.app.view.style.marginTop = Manager.app.view.style.marginBottom = `${verticalMargin}px`;
        }
        
        //to go to a new scene, this function below is called
        //how does that work? a player going out of bounds triggers it?
        //where to put the logic now?
        public static changeScene(newScene: IScene): void {
            if (Manager.currentScene) {
                Manager.app.stage.removeChild(Manager.currentScene);
                Manager.currentScene.destroy();
            }
            //adding the new one
            //these are functions. current scene gets replaced with the name we used 
            //for our scenes
            Manager.currentScene = newScene;
            Manager.app.stage.addChild(Manager.currentScene)
        }
        //the update method
        private static update(framesPassed:number): void{
            //let the current scene know we updated it??
            //check if it exists first....sanity check
            if (Manager.currentScene){
                Manager.currentScene.update(framesPassed);
            }
        }
}
export interface IScene extends DisplayObject{
    update(framesPassed: number): void;
}
