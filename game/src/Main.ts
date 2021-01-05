import * as PIXI from 'pixi.js';
import { Tweener } from "pixi-tweener";
import * as ML5 from 'ml5';
import { Circle } from "./shapes/Circle";
import { ImageSaver } from "./ImageSaver";
import { Triangle } from "./shapes/Triangle";
import Rectangle = PIXI.Rectangle;
import { Learner } from "./learner/Learner";
import { Loader } from "./Loader";
import { Decider } from "./Decider";

export class Main
{
	public static App: PIXI.Application;
	private _container: PIXI.Container;
	private _imageSaver: ImageSaver;
	private _imageCnt: number;

	constructor()
	{
		Main.App = new PIXI.Application(
			{
				width: 64,
				height: 64,
				backgroundColor: 0x1099bb,
				resolution: 1
			}
		);

		document.body.appendChild(Main.App.view);

		this._container = new PIXI.Container();

		Main.App.stage.addChild(this._container);

		this._imageSaver = new ImageSaver(Main.App.renderer, this._container);

		this._imageCnt = 0;

		//this.createImageFile();
		new Loader(Main.App.loader, this);
		//new Decider();
	}

	private createImageFile()
	{
		setTimeout(() =>
		{
			let x = new Circle(Main.App.screen.width, Main.App.screen.height);
			this._container.addChild(x.image);

			if(this._container.height === Main.App.screen.height && this._container.width === Main.App.screen.width)
			{
				this._imageSaver.saveImage(x.name + this._imageCnt);
				this._imageCnt++;
			}

			this._container.removeChildren();
			if(this._imageCnt < 500)
			{
				this.createImageFile();
			}
		},100);
	}

	public setup()
	{
		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
		Tweener.init(Main.App.ticker);

		/*let x = new Triangle(Main.App.screen.width, Main.App.screen.height);
		this._container.addChild(x.image);*/

		//let learner = new Learner();


		Main.App.ticker.add(() => {
			this._container.emit("GAME_TICK");
		});
	}
}

new Main();
