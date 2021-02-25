export interface Activation {
	func: (x: number) => number;
	derivative: (y: number) => number;
}

export const sigmoid: Activation = {
	func: (x: number) => 1 / (1 + Math.exp(-x)),
	derivative: (y: number) => y * (1 - y)
};

export const tanh: Activation = {
	func: (x: number) => Math.tanh(x),
	derivative: (y: number) => 1 - y * y
};
