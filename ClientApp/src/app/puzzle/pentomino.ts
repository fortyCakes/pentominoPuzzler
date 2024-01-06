import { GridLocation, Grid } from "./grid";

export class Pentomino {
  name: string;
  pentominoBlocks: GridLocation[];
  xOffset: number;
  yOffset: number;

  constructor(name: string, squares: number[]) {
    this.name = name;
    const n = 8; // or some dynamic value
    this.pentominoBlocks = new Array<GridLocation>();

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        if (squares.length > x * 5 + y) {
          if (squares[x * 5 + y] == 1) {
            this.pentominoBlocks.push(new GridLocation(x,y))
          }
        }
      }
    }
  }

  public get height(): number {
    for (let y = 4; y >= 0; y--) {
      var anyBlocks = this.pentominoBlocks.map(p => p.y == y)
      if (!anyBlocks) return y;
    }
    return 0;
  }

  public get width(): number {
    for (let x = 4; x >= 0; x--) {
      var anyBlocks = this.pentominoBlocks.map(p => p.x == x)
      if (!anyBlocks) return x;
    }
    return 0;
  }

  public rotate() {
    var newLocations = new Array<GridLocation>();

    this.pentominoBlocks.forEach(b => {
      newLocations.push(new GridLocation(4 - b.y, b.x));
    });

    this.pentominoBlocks = newLocations;
  }

  containsLocation(loc: GridLocation): boolean {
    return this.pentominoBlocks.some(pb => pb.x + this.xOffset == loc.x && pb.y + this.yOffset == loc.y);
  }

  overlapsWith(pentominoOther: Pentomino, withXOffset = 0, withYOffset = 0): boolean {
    return this.pentominoBlocks.some(pb => pentominoOther.pentominoBlocks.some(pbo =>
      pb.x + this.xOffset + withXOffset == pbo.x + pentominoOther.xOffset
      && pb.y + this.yOffset + withYOffset == pbo.y + pentominoOther.yOffset ))
  }

  isAdjacentTo(pentominoOther: Pentomino): boolean {
    // Adjacent if it doesn't overlap, but would if shifted by 1
    return !this.overlapsWith(pentominoOther) &&
      (
        this.overlapsWith(pentominoOther, 0, 1) ||
        this.overlapsWith(pentominoOther, 0, -1) ||
        this.overlapsWith(pentominoOther, 1, 0) ||
        this.overlapsWith(pentominoOther, -1, 0)
      );
  }
}
