import * as PIXI from 'pixi.js';

export class Loader
{
	constructor(loader: PIXI.Loader, callback: any)
	{
		loader
			.add("./game/images/aaaCustom.png")
			.add("customImg", "./game/images/aaaCustomBG.png")
			.load(() => callback.setup());
	}
}
