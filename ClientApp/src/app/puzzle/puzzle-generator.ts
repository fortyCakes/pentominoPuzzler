import { Grid, GridLocation } from "./grid";
import { Pentomino } from "./pentomino";
import { PentominoLibrary } from "./pentomino-library";

export abstract class PuzzleGenerator {
    public static generate(grid: Grid, numberOfPieces: number, numberOfStars: number, numberOfPrizes: number, numberOfBlockers: number, hidePieces: boolean) : boolean {

        var unusedPentominoes = PentominoLibrary.list;

        for (let i = 0; i < numberOfPieces; i++) {
          var placed = false;
          var pentominoCode : string;
          var attempts = 0;
            do {
            pentominoCode = unusedPentominoes
              .charAt(Math.floor(Math.random() * unusedPentominoes.length))
              .toString();
            type ObjectKey = keyof typeof PentominoLibrary;
            var pentomino = PentominoLibrary[pentominoCode as ObjectKey] as Pentomino;
        
            var xOffset = Math.floor(Math.random() * grid.width);
            var yOffset = Math.floor(Math.random() * grid.height);
        
            let mustBeAdjacent = i != 0;
        
            placed =
              placed ||
              grid.placePentomino(pentomino, xOffset, yOffset, true, mustBeAdjacent);
            //console.log("trying to place " + pentominoCode + " at " + xOffset + ", " +yOffset + " with clash true and mustBeAdjacent " + mustBeAdjacent + ", status: " + placed)
      
            if (attempts++ > 15000) {
              return false;
            }
          } while (!placed);
      
          if (placed) {
            unusedPentominoes = unusedPentominoes.replace(pentominoCode, "");
          }
        }
        
        
        for (let i = 0; i < numberOfStars; i++)
        {
            var locations = [] as Array<{x:number, y:number}>;
        
            for (let x = 0; x < grid.width; x++)
            {
              for (let y = 0; y < grid.height; y++)
              {
                if (grid.nodes[x][y] == "P")
                {
                  locations.push({"x": x, "y": y});
                }
              }
            }
      
            if (locations.length == 0) {
              // skip
            }
            else {
      
              var loc = locations[Math.floor(Math.random() * locations.length)];
              grid.nodes[loc.x][loc.y] = "*";
            }
        }
      
        for (let i = 0; i < numberOfStars; i++)
        {
          PuzzleGenerator.placeItem(grid, "*", "P", 5);
        }

        for (let i = 0; i < numberOfPrizes; i++)
        {
          PuzzleGenerator.placeItem(grid, "1", "P.", 2);
        }

        for (let i = 0; i < numberOfBlockers; i++)
        {
          PuzzleGenerator.placeItem(grid, "X", ".", 3);
        }
      
        if (hidePieces)
        {
          for (let x = 0; x < grid.width; x++)
          {
            for (let y = 0; y < grid.height; y++)
            {
              if (PentominoLibrary.list.includes(grid.nodes[x][y])) grid.nodes[x][y] = ".";
            }
          }
      }

      return true;
    }

    private static placeItem(grid: Grid, item: string, validLocations: string, locationsToTry: number) {
        var locations = [] as Array<GridLocation>;

        for (let x = 0; x < grid.width; x++) {
            for (let y = 0; y < grid.height; y++) {
                if (validLocations.includes(grid.nodes[x][y])) {
                    locations.push({ "x": x, "y": y });
                }
            }
        }

        if (locations.length == 0) {
            // skip
        }
        else {
            var loc: GridLocation = new GridLocation(-1,-1);
            var distance: number = -999;

            for (let i = 0; i < locationsToTry; i++)
            {
                var newLoc : GridLocation = locations[Math.floor(Math.random() * locations.length)];
                var newDistance = findDistanceTo(grid, newLoc, item);

                if (newDistance > distance) {
                    loc = newLoc;
                    distance = newDistance;
                }
            }

            grid.nodes[loc.x][loc.y] = item;

            
        }
    }
}

function findDistanceTo(grid: Grid, loc: { x: number; y: number; }, item: string) : number {
    var distance = 999;
    
    for (let x = 0; x < grid.width; x++)
    {
        for (let y = 0; y < grid.height; y++) {
            if (grid.nodes[x][y] == item)
            {
                var newDist = Math.sqrt(Math.pow(x -loc.x, 2) + Math.pow(y - loc.y, 2));
                if (newDist < distance) distance = newDist;
            }
        }
    }

    return distance;
}
