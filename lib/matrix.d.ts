export default class Matrix {
    rows: number;
    cols: number;
    data: number[][];
    constructor(rows: number, cols: number);
    randomize(): Matrix;
    copy(): Matrix;
    static fromArray(arr: number[]): Matrix;
    toArray(): number[];
    map(func: (val: number, row: number, col: number) => number): Matrix;
    dotMultiply(other: Matrix): Matrix;
    multiplyMatrix(other: Matrix): Matrix;
    multiply(num: number): Matrix;
    addMatrix(other: Matrix): Matrix;
    add(num: number): Matrix;
    subtractMatrix(other: Matrix): Matrix;
    transpose(): Matrix;
    print(): void;
}
//# sourceMappingURL=matrix.d.ts.map