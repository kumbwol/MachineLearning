import * as ML5 from 'ml5';
import * as PIXI from "pixi.js";

export class Learner
{
	constructor()
	{
		let options =
		{
			inputs: [64, 64, 4],
			task: 'imageClassification',
			debug: true
		};

		let shapeClassifier = ML5.neuralNetwork(options);

		let circles = [];
		let triangles = [];

		for(let i=0; i<500; i++)
		{
			let x = document.createElement('img');
			x.src = "./game/images/circle" + i + ".png";
			circles.push(x);

			let y = document.createElement('img');
			y.src = "./game/images/triangle" + i + ".png";
			triangles.push(y);

			document.getElementsByTagName("body")[0].appendChild(x);
			document.getElementsByTagName("body")[0].appendChild(y);
		}

		setTimeout(() =>
		{
			console.log("startTraining");

			for(let i=0; i<circles.length; i++)
			{
				shapeClassifier.addData({image: circles[i]}, {label: 'circle'});
			}

			for(let i=0; i<triangles.length; i++)
			{
				shapeClassifier.addData({image: triangles[i]}, {label: 'triangle'});
			}

			shapeClassifier.normalizeData();
			shapeClassifier.train({epochs: 80}, () => this.finishedTraining(shapeClassifier));
		}, 2000);


	}

	private finishedTraining(shapeClassifier)
	{
		console.log("finishedTraining!");
		shapeClassifier.save();
	}
}
