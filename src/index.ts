// import { Application, Sprite } from 'pixi.js'

import { LoaderScene } from "./LoaderScene";
import { Manager } from "./Manager";

// const app = new Application({
// 	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
// 	resolution: window.devicePixelRatio || 1,
// 	autoDensity: true,
// 	backgroundColor: 0x6495ed,
// 	width: 640,
// 	height: 480
// });

// const clampy: Sprite = Sprite.from("clampy.png");

// clampy.anchor.set(0.5);

// clampy.x = app.screen.width / 2;
// clampy.y = app.screen.height / 2;

// app.stage.addChild(clampy);

Manager.initialize(640, 480, 0x6495ed);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);
console.log(Manager.width);
