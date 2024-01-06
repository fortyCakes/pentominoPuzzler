export class Pentomino {
    name: string;
    shape: boolean[][];
    constructor(name: string, squares: number[]) {
      this.name = name;
      const n = 8; // or some dynamic value
      this.shape = new Array(5).fill(false).map(() => new Array(5).fill(false));
  
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          if (squares.length > x * 5 + y) {
            if (squares[x * 5 + y] == 1) {
              this.shape[x][y] = true;
            }
          }
        }
      }
    }
  
    public get height(): number {
      for (let y = 4; y >= 0; y--) {
        var noBlocks = true;
        for (let x = 0; x < 5; x++) {
          if (this.shape[x][y]) noBlocks = false;
        }
        if (noBlocks) return y;
      }
      return 0;
    }
  
    public get width(): number {
      for (let x = 4; x >= 0; x--) {
        var noBlocks = true;
        for (let y = 0; y < 5; y++) {
          if (this.shape[x][y]) noBlocks = false;
        }
        if (noBlocks) return x;
      }
      return 0;
    }

    public rotate() {

        var n = this.shape.length;
        var x = Math.floor(n/ 2);
        const y = n - 1;
        for (let i = 0; i < x; i++) {
           for (let j = i; j < y - i; j++) {
              var k = this.shape[i][j];
              this.shape[i][j] = this.shape[y - j][i];
              this.shape[y - j][i] = this.shape[y - i][y - j];
              this.shape[y - i][y - j] = this.shape[j][y - i]
              this.shape[j][y - i] = k
           }
      }
    }
  }