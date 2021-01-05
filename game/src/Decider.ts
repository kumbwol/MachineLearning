import * as PIXI from 'pixi.js';
import * as ML5 from 'ml5';

export class Decider
{
	public static VIDEO;
	public static CLASSIFIER;

	constructor()
	{
		let options =
			{
				inputs: [64, 64, 4],
				task: 'imageClassification',
			};

		Decider.CLASSIFIER = ML5.neuralNetwork(options);

		let modelDetails = {
			model: "./game/model/model.json",
			metadata: "./game/model/model_meta.json",
			weights: "./game/model/model.weights.bin"
		};

		let canvas = document.createElement('img');
		canvas.src = "./game/images/aaaCustom.png";
		document.getElementsByTagName("body")[0].appendChild(canvas);


		let decideButton = document.createElement('BUTTON');
		decideButton.innerHTML = "Decide";
		document.getElementsByTagName("body")[0].appendChild(decideButton);

		decideButton.addEventListener("click", () =>
		{
			var canvas = document.querySelector('canvas');
			canvas.height = 64;
			canvas.width = 64;

			console.log(canvas.id);

			var context = canvas.getContext('2d');

			context.drawImage(Decider.VIDEO, 0, 0, canvas.width, canvas.height);


			Decider.CLASSIFIER.classify({image: canvas}, (err, results) =>
			{
				console.log(canvas);
				console.log(results);
			});
			// video 'play' event listener
			Decider.VIDEO.addEventListener('play', function() {
				context.drawImage(this, 0, 0, canvas.width, canvas.height);
			}, false);
		});

		navigator.mediaDevices.getUserMedia({
				video: {
					width:     640,
					height:    640,
					frameRate: 20
				}
			}
		).then(function(stream) {
			console.log("haahaaa");
			Decider.VIDEO = document.querySelector('video');
			Decider.VIDEO.srcObject = stream;
			Decider.VIDEO.onloadedmetadata = function(e) {
				Decider.VIDEO.play();
			};
		}).catch(function(err) {
			// deal with an error (such as no webcam)
		});

		setTimeout(() =>
		{
			Decider.CLASSIFIER.load(modelDetails, () =>
			{
				console.log("Model Ready");

				Decider.CLASSIFIER.classify({image: canvas}, (err, results) =>
				{
					console.log(canvas);
					console.log(results);
				});
			});
		}, 300);
	}

}
