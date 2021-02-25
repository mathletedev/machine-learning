"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array(this.rows).fill(Array(this.cols).fill(0));
    }
    randomize() {
        return this.map(() => Math.random() * 2 - 1);
    }
    copy() {
        let matrix = new Matrix(this.rows, this.cols);
        matrix.data = matrix.data.map((row, i) => row.map((_, j) => this.data[i][j]));
        return matrix;
    }
    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((_, row) => arr[row]);
    }
    toArray() {
        return this.data.reduce((acc, curr) => acc.concat(curr));
    }
    map(func) {
        let matrix = this.copy();
        matrix.data = matrix.data.map((row, i) => row.map((val, j) => func(val, i, j)));
        return matrix;
    }
    dotMultiply(other) {
        return new Matrix(this.rows, other.cols).map((_, row, col) => {
            let res = 0;
            for (let i = 0; i < this.cols; i++)
                res += this.data[row][i] * other.data[i][col];
            return res;
        });
    }
    multiplyMatrix(other) {
        return this.map((val, row, col) => val * other.data[row][col]);
    }
    multiply(num) {
        return this.map((val) => val * num);
    }
    addMatrix(other) {
        return this.map((val, row, col) => val + other.data[row][col]);
    }
    add(num) {
        return this.map((val) => val + num);
    }
    subtractMatrix(other) {
        return this.map((val, row, col) => val - other.data[row][col]);
    }
    transpose() {
        return new Matrix(this.cols, this.rows).map((_, row, col) => this.data[col][row]);
    }
    print() {
        console.table(this.data);
    }
}
exports.default = Matrix;
//# sourceMappingURL=matrix.js.map