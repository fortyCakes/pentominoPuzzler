import {PentominoLibrary} from "./pentomino-library"
import {Pentomino} from "./pentomino"

export class GridLocation {
  x:number;
  y:number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }
}

export class Grid {
    nodes: string[][];
    pentominoesUsed: string = "";
    width: number;
    height: number;
  
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.nodes = new Array(width)
        .fill('.')
        .map(() => new Array(height).fill('.'));
    }
  
    public toString = (): string => {
      var retval = '';
      retval += "┏" + "━".repeat(this.width * 2) + "┓\n"
      for (let x = 0; x < this.width; x++) {
        retval += "┃"
        for (let y = 0; y < this.height; y++) {
          retval += this.nodes[x][y] + " ";
        }
        retval += '┃\n';
      }
      retval += '┗' + "━".repeat(this.width * 2) + '┛\n';
      retval += 'Pentominoes used: ' + this.pentominoesUsed;
      retval += '\n';

      for (let y = 0; y < 5; y++)
      {
        for (let pentominoIndex = 0; pentominoIndex < this.pentominoesUsed.length; pentominoIndex++)
        {
          var pentominoCode= this.pentominoesUsed.charAt(pentominoIndex);
          type ObjectKey = keyof typeof PentominoLibrary;
          var pentomino = PentominoLibrary[pentominoCode as ObjectKey] as Pentomino;
          for (let x = 0; x < 5; x++)
          {
            retval += pentomino.shape[x][y] ? "0" : " ";
          }
          retval += " ";
        }
        retval += "\n";
      }

      return retval;
    };
  
    public placePentomino(
      pentomino: Pentomino,
      xOffset: number,
      yOffset: number,
      checkForClash: boolean = false,
      checkIsAdjacent: boolean = false
    ): boolean {
      if (xOffset < 0 || yOffset < 0) return false;
      if (xOffset + pentomino.width >= this.width) return false;
      if (yOffset + pentomino.height >= this.height) return false;
  
      if (checkForClash) {
        for (let x = 0; x < 5; x++) {
          for (let y = 0; y < 5; y++) {
            if (this.nodes[x + xOffset][y + yOffset] != '.') return false;
          }
        }
      }
  
      if (checkIsAdjacent) {
        var isAdjacent = false;
        for (let x = 0; x < 5; x++) {
          for (let y = 0; y < 5; y++) {
            if (pentomino.shape[x][y] == true) {
              if (
                x + xOffset - 1 >= 0 &&
                this.nodes[x + xOffset - 1][y + yOffset] !== '.'
              )
                isAdjacent = true;
  
              if (
                x + xOffset + 1 < this.width &&
                this.nodes[x + xOffset + 1][y + yOffset] !== '.'
              )
                isAdjacent = true;
  
              if (
                y + yOffset - 1 >= 0 &&
                this.nodes[x + xOffset][y + yOffset - 1] !== '.'
              )
                isAdjacent = true;
  
              if (
                y + yOffset + 1 < this.height &&
                this.nodes[x + xOffset][y + yOffset + 1] !== '.'
              )
                isAdjacent = true;
            }
          }
        }
        if (!isAdjacent) return false;
      }
  
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          if (pentomino.shape[x][y]) this.nodes[x + xOffset][y + yOffset] = pentomino.name;
        }
      }
  
      this.pentominoesUsed += pentomino.name;
      return true;
    }
  }
