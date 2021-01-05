import * as PIXI from 'pixi.js';

export class ImageSaver
{
	private _renderer: PIXI.Renderer;
	private _container: PIXI.Container;

	constructor(renderer: PIXI.Renderer, container: PIXI.Container)
	{
		this._renderer = renderer;
		this._container = container;
	}

	public saveImage(fileName: string)
	{
		this._renderer.extract.canvas(this._container).toBlob((b) =>
		{
			var a = document.createElement('a');
			document.body.append(a);
			a.download = fileName;
			a.href = URL.createObjectURL(b);
			a.click();
			a.remove();
		}, 'image/png');
	}
}
