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

export const linear: Activation = {
	func: (x: number) => x,
	derivative: (_: number) => 1
};

export const relu: Activation = {
	func: (x: number) => Math.max(0, x),
	derivative: (y: number) => (y > 0 ? 1 : 0)
};
