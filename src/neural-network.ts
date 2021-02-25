import Matrix from "./matrix";
import { Activation, relu, sigmoid, tanh } from "./activation";

const ACTIVATIONS: Record<string, Activation> = {
	relu,
	sigmoid,
	tanh
};
export default class NeuralNetwork {
	private weights: Matrix[] = [];
	private biases: Matrix[] = [];
	private lr: number;
	private data: Matrix[] = [];
	private activation: Activation;
	private inputLength: number;
	private outputLength: number;

	public constructor(
		sizes: number[],
		lr: number = 0.5,
		activation: string = "sigmoid"
	) {
		if (sizes.length < 2) throw "Neural network must contain at least 2 layers";
		if (!ACTIVATIONS[activation.toLowerCase()])
			throw `Unknown activation function ${activation}`;

		this.inputLength = sizes[0];
		this.outputLength = sizes[sizes.length - 1];

		sizes.forEach((size: number, i: number): void => {
			if (i < sizes.length - 1)
				this.weights.push(new Matrix(sizes[i + 1], size).randomize());
			if (i > 0) this.biases.push(new Matrix(size, 1).randomize());
		});
		this.lr = lr;

		this.activation = ACTIVATIONS[activation.toLowerCase()];
	}

	public predict(inputs: number[]): number[] {
		if (inputs.length !== this.inputLength)
			throw `Neural network requires ${this.inputLength} inputs`;

		this.data = [];
		let curr: Matrix = Matrix.fromArray(inputs);
		this.data.push(curr);

		for (let i: number = 0; i < this.weights.length; i++) {
			curr = this.weights[i]
				.dotMultiply(curr)
				.addMatrix(this.biases[i])
				.map(this.activation.func);
			if (i < this.weights.length - 1) this.data.push(curr);
		}

		return curr.toArray();
	}

	public train(inputs: number[], targets: number[]): void {
		if (targets.length !== this.outputLength)
			throw `Neural network requires ${this.outputLength} targets`;

		const outputs: Matrix = Matrix.fromArray(this.predict(inputs));

		let currTargets: Matrix = Matrix.fromArray(targets);
		let errors: Matrix = currTargets.subtractMatrix(outputs);
		let gradients: Matrix = outputs.map(this.activation.derivative);

		for (let i: number = this.weights.length - 1; i >= 0; i--) {
			gradients = gradients.multiplyMatrix(errors).multiply(this.lr);
			const layer: Matrix = this.data[i];

			this.weights[i] = this.weights[i].addMatrix(
				gradients.dotMultiply(layer.transpose())
			);
			this.biases[i] = this.biases[i].addMatrix(gradients);

			currTargets = this.weights[i].transpose();
			errors = currTargets.dotMultiply(errors);
			gradients = layer.map(this.activation.derivative);
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
