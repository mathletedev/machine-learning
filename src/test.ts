import NeuralNetwork from "./neural-network";

const nn: NeuralNetwork = new NeuralNetwork([2, 3, 1], 0.5, "sigmoid");
const data = [
	[[0, 0], [0]],
	[[0, 1], [1]],
	[[1, 0], [1]],
	[[1, 1], [0]]
];

nn.printData();
console.log(nn.predict([0, 0]));
console.log(nn.predict([1, 0]));
console.log(nn.predict([0, 1]));
console.log(nn.predict([1, 1]));

for (let i = 1; i <= 500000; i++) {
	const dataPoint: number[][] = data[i % 4];
	nn.train(dataPoint[0], dataPoint[1]);
}

nn.printData();
console.log(nn.predict([0, 0]));
console.log(nn.predict([1, 0]));
console.log(nn.predict([0, 1]));
console.log(nn.predict([1, 1]));
