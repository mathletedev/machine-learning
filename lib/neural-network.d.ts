export default class NeuralNetwork {
    private weights;
    private biases;
    private lr;
    private data;
    private activation;
    constructor(sizes: number[], lr?: number, activation?: string);
    predict(inputs: number[]): number[];
    train(inputs: number[], targets: number[]): void;
    printData(): void;
}
//# sourceMappingURL=neural-network.d.ts.map