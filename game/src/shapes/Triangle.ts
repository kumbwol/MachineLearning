import * as PIXI from 'pixi.js';
import { Shape } from "./Shape";

export class Triangle extends Shape
{
	private _maxStroke: number;
	private _minStroke: number;
	private _minimumDistance: number;

	private _ax: number;
	private _ay: number;

	private _bx: number;
	private _by: number;

	private _cx: number;
	private _cy: number;

	private _stroke: number;
	private _name: string;

	constructor(maxWidth: number, maxHeight: number)
	{
		super(maxWidth, maxHeight);
		this._name = "triangle";
		this._maxStroke = 5;
		this._minStroke = 2;
		this._minimumDistance = 30;
		this.generateRandomTriangle(maxWidth, maxHeight);
	}

	private generateRandomTriangle(maxWidth: number, maxHeight: number)
	{
		this.createBackground(maxWidth, maxHeight);
		this._stroke = Math.floor(Math.random() * (this._maxStroke - this._minStroke)) + this._minStroke;

		this._ax = Math.floor(Math.random() * maxWidth);
		this._ay = Math.floor(Math.random() * maxHeight);

		this.createSecondPoint(maxWidth, maxWidth);
		this.createThirdPoint(maxWidth, maxWidth);

		this.shape.lineStyle(this._stroke, this.addRandomColor());

		let sideA = Math.abs(this._bx - this._cx) * Math.abs(this._bx - this._cx) + Math.abs(this._by - this._cy) * Math.abs(this._by - this._cy);
		let sideB = Math.abs(this._ax - this._cx) * Math.abs(this._ax - this._cx) + Math.abs(this._ay - this._cy) * Math.abs(this._ay - this._cy);
		let sideC = Math.abs(this._bx - this._ax) * Math.abs(this._bx - this._ax) + Math.abs(this._by - this._ay) * Math.abs(this._by - this._ay);

		let minimumRate = 20;

		if((sideA + sideB < sideC * (1 + minimumRate/100)) ||
			(sideA + sideC < sideB * (1 + minimumRate/100)) ||
			(sideB + sideC < sideA * (1 + minimumRate/100)))
		{
			this.generateRandomTriangle(maxWidth, maxHeight);
		}

		this.shape.moveTo(this._ax, this._ay);
		this.shape.lineTo(this._bx, this._by);
		this.shape.moveTo(this._bx, this._by);
		this.shape.lineTo(this._cx, this._cy);
		this.shape.moveTo(this._cx, this._cy);
		this.shape.lineTo(this._ax, this._ay);

		this.mainContainer.addChild(this.shape);

		if(this.mainContainer.width > maxWidth || this.mainContainer.height > maxHeight)
		{
			this.shape = new PIXI.Graphics;
			this.mainContainer = new PIXI.Container;
			this.generateRandomTriangle(maxWidth, maxHeight);
		}
	}

	private createSecondPoint(maxWidth: number, maxHeight: number)
	{
		this._bx = Math.floor(Math.random() * maxWidth);
		this._by = Math.floor(Math.random() * maxHeight);

		let distanceX = Math.abs(this._bx - this._ax);
		let distanceY = Math.abs(this._by - this._ay);

		if(distanceX * distanceX + distanceY * distanceY < this._minimumDistance * this._minimumDistance)
		{
			this.createSecondPoint(maxWidth, maxHeight);
		}
	}

	private createThirdPoint(maxWidth: number, maxHeight: number)
	{
		this._cx = Math.floor(Math.random() * maxWidth);
		this._cy = Math.floor(Math.random() * maxHeight);

		let distanceAX = Math.abs(this._cx - this._ax);
		let distanceAY = Math.abs(this._cy - this._ay);

		let distanceBX = Math.abs(this._cx - this._bx);
		let distanceBY = Math.abs(this._cy - this._by);

		if(distanceAX * distanceAX + distanceAY * distanceAY < this._minimumDistance * this._minimumDistance ||
			distanceBX * distanceBX + distanceBY * distanceBY < this._minimumDistance * this._minimumDistance)
		{
			this.createThirdPoint(maxWidth, maxHeight);
		}
	}

	public get name(): string
	{
		return this._name;
	}
}
