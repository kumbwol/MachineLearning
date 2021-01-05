import * as PIXI from 'pixi.js';
import { Shape } from "./Shape";

export class Circle extends Shape
{
	private _width: number;
	private _height: number;
	private _maximumWidth: number;
	private _maximumHeight: number;
	private _minimumWidth: number;
	private _minimumHeight: number;
	private _maxEclipseRate: number;
	private _maxStroke: number;
	private _minStroke: number;

	private _x: number;
	private _y: number;

	private _stroke: number;
	private _name: string;

	constructor(maxWidth: number, maxHeight: number)
	{
		super(maxWidth, maxHeight);
		this._name = "circle";
		this._maximumWidth = maxWidth / 2;
		this._maximumHeight = maxHeight / 2;
		this._minimumWidth = 15;
		this._minimumHeight = 15;
		this._maxEclipseRate = 20; //percent
		this._maxStroke = 5;
		this._minStroke = 2;
		this.generateRandomCircle(maxWidth, maxHeight);
	}

	private generateRandomCircle(maxWidth: number, maxHeight: number)
	{
		this.createBackground(maxWidth, maxHeight);
		this._stroke = Math.floor(Math.random() * (this._maxStroke - this._minStroke)) + this._minStroke;

		this.shape.lineStyle(this._stroke, this.addRandomColor());

		this._width = this.addRandomWidth();
		this._height = this.addRandomHeight();
		this.addRandomPosition(maxWidth, maxHeight);

		this.shape.drawEllipse(this._x, this._y, this._width, this._height);
		this.shape.endFill();

		this.mainContainer.addChild(this.shape);

		if(this.mainContainer.width > maxWidth || this.mainContainer.height > maxHeight)
		{
			this.shape = new PIXI.Graphics;
			this.mainContainer = new PIXI.Container;
			this.generateRandomCircle(maxWidth, maxHeight);
		}
	}

	private addRandomPosition(maxWidth: number, maxHeight: number)
	{
		this._x = Math.floor(Math.random() * (maxWidth - (this._width * 2))) + Math.floor(this._width);
		this._y = Math.floor(Math.random() * (maxHeight - (this._height * 2))) + Math.floor(this._height);
	}

	private addRandomHeight(): number
	{
		let eclipseRate = Math.floor(Math.random() * this._maxEclipseRate);

		if(this._width * (1+(eclipseRate/100)) + this._stroke >= this._maximumHeight)
		{
			return Math.floor(this._width - this._width * ((eclipseRate/100)));
		}
		else if(this._width * ((eclipseRate/100)) - this._stroke < this._minimumHeight)
		{
			return Math.floor(this._width + this._width * ((eclipseRate/100)));
		}
		else
		{
			if(Math.floor(Math.random() * 2) === 0)
			{
				return Math.floor(this._width - this._width * ((eclipseRate/100)));
			}
			else
			{
				return Math.floor(this._width + this._width * ((eclipseRate/100)));
			}
		}
	}

	private addRandomWidth(): number
	{
		return Math.floor(Math.random() * (this._maximumWidth - this._minimumWidth)) + this._minimumWidth - this._stroke;
	}

	public get name(): string
	{
		return this._name;
	}
}
