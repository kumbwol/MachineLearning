import * as PIXI from 'pixi.js';

export class Shape
{
	protected shape: PIXI.Graphics;
	protected mainContainer: PIXI.Container;

	constructor(maxWidth: number, maxHeight: number)
	{
		this.shape = new PIXI.Graphics;
		this.mainContainer = new PIXI.Container;
	}

	public get image(): PIXI.Container
	{
		return this.mainContainer;
	}

	protected createBackground(maxWidth: number, maxHeight: number)
	{
		/*let background = new PIXI.Graphics();
		background.beginFill(16777215, 1);
		background.drawRect(0,0, maxWidth, maxHeight);
		background.endFill();

		for(let i=0; i<100; i++)
		{
			let dot = new PIXI.Graphics();

			let dotSize = Math.floor(Math.random() * 4) + 1;
			let x = Math.abs(Math.floor(Math.random() * maxWidth) - dotSize);
			let y = Math.abs(Math.floor(Math.random() * maxHeight) - dotSize);
			let w = dotSize;
			let h = dotSize;

			dot.beginFill(Math.floor(Math.random() * 16777215));
			dot.drawRect(x, y, w, h);
			dot.endFill();

			background.addChild(dot);
		}*/

		let backgroundTexture = PIXI.Texture.from("customImg");
		let background = new PIXI.Sprite(backgroundTexture);

		this.mainContainer.addChild(background);
	}

	protected addRandomColor(): number
	{
		return Math.floor(Math.random() * (256*50));
	}
}
