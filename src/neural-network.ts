import Matrix from "./matrix";
import { Activation, sigmoid, tanh } from "./activation";

export default class NeuralNetwork {
	private weights: Matrix[] = [];
	private biases: Matrix[] = [];
	private lr: number;
	private data: Matrix[] = [];
	private activation: Activation;

	public constructor(
		sizes: number[],
		lr: number = 0.5,
		activation: string = "sigmoid"
	) {
		sizes.forEach((size: number, i: number): void => {
			if (i < sizes.length - 1)
				this.weights.push(new Matrix(sizes[i + 1], size).randomize());
			if (i > 0) this.biases.push(new Matrix(size, 1).randomize());
		});
		this.lr = lr;

		switch (activation) {
			default:
				this.activation = sigmoid;
			case "sigmoid":
				this.activation = sigmoid;
			case "tanh":
				this.activation = tanh;
		}
	}

	public predict(inputs: number[]): number[] {
		this.data = [];
		let curr: Matrix = Matrix.fromArray(inputs);

		for (let i: number = 0; i < this.weights.length; i++) {
			curr = this.weights[i]
				.dotMultiply(curr)
				.addMatrix(this.biases[i])
				.map(this.activation.func);
			this.data.push(curr);
		}

		return curr.toArray();
	}

	public train(inputs: number[], targets: number[]): void {
		const outputs: Matrix = Matrix.fromArray(this.predict(inputs));

		let currTargets: Matrix = Matrix.fromArray(targets);
		let errors: Matrix = currTargets.subtractMatrix(outputs);
		let gradients: Matrix = outputs.map(this.activation.derivative);

		for (let i: number = this.weights.length - 1; i >= 0; i--) {
			gradients = gradients.multiplyMatrix(errors).multiply(this.lr);
			const layer: Matrix = this.data[this.weights.length - 1 - i].transpose();
			let wDeltas: Matrix = gradients.dotMultiply(layer);

			this.weights[i] = this.weights[i].addMatrix(wDeltas);
			this.biases[i] = this.biases[i].addMatrix(gradients);

			currTargets = this.weights[i].transpose();
			errors = currTargets.dotMultiply(errors);
			gradients = layer.map(this.activation.derivative).transpose();
		}
	}

	public printData(): void {
		console.log("Weights");
		console.log("-".repeat(50));
		this.weights.forEach((weight: Matrix) => weight.print());
		console.log("Biases");
		console.log("-".repeat(50));
		this.biases.forEach((bias: Matrix) => bias.print());
	}
}
