export default class NeuralNetwork {
    private weights;
    private biases;
    private lr;
    private data;
    private activation;
    private inputLength;
    private outputLength;
    constructor(sizes: number[], lr?: number, activation?: string);
    predict(inputs: number[]): number[];
    train(inputs: number[], targets: number[]): void;
}
//# sourceMappingURL=neural-network.d.ts.map