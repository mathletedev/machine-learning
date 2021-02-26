export default class Matrix {
	public rows: number;
	public cols: number;
	public data: number[][];

	public constructor(rows: number, cols: number) {
		this.rows = rows;
		this.cols = cols;
		this.data = Array(this.rows).fill(Array(this.cols).fill(0));
	}

	public randomize(): Matrix {
		return this.map((): number => Math.random() * 2 - 1);
	}

	public copy(): Matrix {
		let matrix: Matrix = new Matrix(this.rows, this.cols);

		matrix.data = matrix.data.map((row: number[], i: number): number[] =>
			row.map((_: number, j: number): number => this.data[i][j])
		);

		return matrix;
	}

	public static fromArray(arr: number[]): Matrix {
		return new Matrix(arr.length, 1).map(
			(_: number, row: number): number => arr[row]
		);
	}

	public toArray(): number[] {
		return this.data.reduce((acc: number[], curr: number[]): number[] =>
			acc.concat(curr)
		);
	}

	public map(func: (val: number, row: number, col: number) => number): Matrix {
		let matrix: Matrix = this.copy();

		matrix.data = matrix.data.map((row: number[], i: number): number[] =>
			row.map((val: number, j: number) => func(val, i, j))
		);

		return matrix;
	}

	public dotMultiply(other: Matrix): Matrix {
		return new Matrix(this.rows, other.cols).map(
			(_: number, row: number, col: number): number => {
				let res: number = 0;
				for (let i: number = 0; i < this.cols; i++)
					res += this.data[row][i] * other.data[i][col];
				return res;
			}
		);
	}

	public multiplyMatrix(other: Matrix): Matrix {
		return this.map(
			(val: number, row: number, col: number): number =>
				val * other.data[row][col]
		);
	}

	public multiply(num: number): Matrix {
		return this.map((val: number): number => val * num);
	}

	public addMatrix(other: Matrix): Matrix {
		return this.map(
			(val: number, row: number, col: number): number =>
				val + other.data[row][col]
		);
	}

	public add(num: number): Matrix {
		return this.map((val: number): number => val + num);
	}

	public subtractMatrix(other: Matrix): Matrix {
		return this.map(
			(val: number, row: number, col: number): number =>
				val - other.data[row][col]
		);
	}

	public transpose(): Matrix {
		return new Matrix(this.cols, this.rows).map(
			(_: number, row: number, col: number): number => this.data[col][row]
		);
	}

	public print(): void {
		console.table(this.data);
	}
}
