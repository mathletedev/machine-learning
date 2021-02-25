"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = __importDefault(require("./matrix"));
const activation_1 = require("./activation");
class NeuralNetwork {
    constructor(sizes, lr = 0.5, activation = "sigmoid") {
        this.weights = [];
        this.biases = [];
        this.data = [];
        sizes.forEach((size, i) => {
            if (i < sizes.length - 1)
                this.weights.push(new matrix_1.default(sizes[i + 1], size).randomize());
            if (i > 0)
                this.biases.push(new matrix_1.default(size, 1).randomize());
        });
        this.lr = lr;
        switch (activation) {
            default:
                this.activation = activation_1.sigmoid;
                break;
            case "sigmoid":
                this.activation = activation_1.sigmoid;
                break;
            case "tanh":
                this.activation = activation_1.tanh;
                break;
        }
    }
    predict(inputs) {
        this.data = [];
        let curr = matrix_1.default.fromArray(inputs);
        this.data.push(curr);
        for (let i = 0; i < this.weights.length; i++) {
            curr = this.weights[i]
                .dotMultiply(curr)
                .addMatrix(this.biases[i])
                .map(this.activation.func);
            if (i < this.weights.length - 1)
                this.data.push(curr);
        }
        return curr.toArray();
    }
    train(inputs, targets) {
        const outputs = matrix_1.default.fromArray(this.predict(inputs));
        let currTargets = matrix_1.default.fromArray(targets);
        let errors = currTargets.subtractMatrix(outputs);
        let gradients = outputs.map(this.activation.derivative);
        for (let i = this.weights.length - 1; i >= 0; i--) {
            gradients = gradients.multiplyMatrix(errors).multiply(this.lr);
            const layer = this.data[i];
            this.weights[i] = this.weights[i].addMatrix(gradients.dotMultiply(layer.transpose()));
            this.biases[i] = this.biases[i].addMatrix(gradients);
            currTargets = this.weights[i].transpose();
            errors = currTargets.dotMultiply(errors);
            gradients = layer.map(this.activation.derivative);
        }
    }
    printData() {
        console.log("Weights");
        console.log("-".repeat(50));
        this.weights.forEach((weight) => weight.print());
        console.log("Biases");
        console.log("-".repeat(50));
        this.biases.forEach((bias) => bias.print());
    }
}
exports.default = NeuralNetwork;
//# sourceMappingURL=neural-network.js.map