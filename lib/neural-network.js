"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = __importDefault(require("./matrix"));
const activation_1 = require("./activation");
const ACTIVATIONS = {
    relu: activation_1.relu,
    sigmoid: activation_1.sigmoid,
    tanh: activation_1.tanh
};
class NeuralNetwork {
    constructor(sizes, lr = 0.5, activation = "sigmoid") {
        this.weights = [];
        this.biases = [];
        this.data = [];
        if (sizes.length < 2)
            throw "Neural network must contain at least 2 layers";
        if (!ACTIVATIONS[activation.toLowerCase()])
            throw `Unknown activation function ${activation}`;
        this.inputLength = sizes[0];
        this.outputLength = sizes[sizes.length - 1];
        sizes.forEach((size, i) => {
            if (i < sizes.length - 1)
                this.weights.push(new matrix_1.default(sizes[i + 1], size).randomize());
            if (i > 0)
                this.biases.push(new matrix_1.default(size, 1).randomize());
        });
        this.lr = lr;
        this.activation = ACTIVATIONS[activation.toLowerCase()];
    }
    predict(inputs) {
        if (inputs.length !== this.inputLength)
            throw `Neural network requires ${this.inputLength} inputs`;
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
        if (targets.length !== this.outputLength)
            throw `Neural network requires ${this.outputLength} targets`;
        const outputs = matrix_1.default.fromArray(this.predict(inputs));
        let errors = matrix_1.default.fromArray(targets).subtractMatrix(outputs);
        let gradients = outputs.map(this.activation.derivative);
        for (let i = this.weights.length - 1; i >= 0; i--) {
            gradients = gradients.multiplyMatrix(errors).multiply(this.lr);
            const layer = this.data[i];
            this.weights[i] = this.weights[i].addMatrix(gradients.dotMultiply(layer.transpose()));
            this.biases[i] = this.biases[i].addMatrix(gradients);
            errors = this.weights[i].transpose().dotMultiply(errors);
            gradients = layer.map(this.activation.derivative);
        }
    }
}
exports.default = NeuralNetwork;
//# sourceMappingURL=neural-network.js.map