import { Grid, GridLocation } from "./grid";

export abstract class GridToText {
  public static getViewOfPuzzle = (grid: Grid, showSolution: boolean) => {
    var retval = '';
    retval += "┏" + "━".repeat(grid.width * 2 + 1) + "┓\n";
    for (let x = 0; x < grid.width; x++) {
      retval += "┃ ";
      for (let y = 0; y < grid.height; y++) {
        retval += GridToText.determineCellContent(grid, x, y, showSolution) + " ";
      }
      retval += '┃\n';
    }
    retval += '┗' + "━".repeat(grid.width * 2 + 1) + '┛\n';
    retval += 'Pentominoes used: ';
    for (let pentominoIndex = 0; pentominoIndex < grid.pentominoes.length; pentominoIndex++) {
      retval += grid.pentominoes[pentominoIndex].name;
    }
    retval += '\n'
    grid.pentominoes.forEach(p => {
      retval += p.name + ": (" + p.xOffset + ", " + p.yOffset + "), " + p.width + "x" + p.height + "\n";
    })
    retval += '\n';

    //for (let y = 0; y < 5; y++)
    //{
    //  for (let pentominoIndex = 0; pentominoIndex < this.pentominoesUsed.length; pentominoIndex++)
    //  {
    //    var pentominoCode= this.pentominoesUsed.charAt(pentominoIndex);
    //    type ObjectKey = keyof typeof PentominoLibrary;
    //    var pentomino = PentominoLibrary[pentominoCode as ObjectKey] as Pentomino;
    //    for (let x = 0; x < 5; x++)
    //    {
    //      retval += pentomino.shape[x][y] ? "0" : " ";
    //    }
    //    retval += " ";
    //  }
    //  retval += "\n";
    //}
    return retval;
  }

  public static determineCellContent(grid: Grid, x: number, y: number, showSolution: boolean): string {
    var loc = new GridLocation(x, y);

    if (showSolution) {
      var pentomino = grid.pentominoes.find(p => p.containsLocation(loc))
      if (pentomino != undefined) {
        return "<b>" + pentomino.name + "</b>";
      }
    }

    if (grid.stars.some(s => s.x == loc.x && s.y == loc.y)) {
      return "*";
    }
    if (grid.points.some(s => s.x == loc.x && s.y == loc.y)) {
      return "1";
    }
    if (grid.blocks.some(s => s.x == loc.x && s.y == loc.y)) {
      return "X";
    }

    return ".";
  }
}
