import { Grid, GridLocation } from "./grid";
import { Pentomino } from "./pentomino";
import { PentominoLibrary } from "./pentomino-library";

export abstract class PuzzleGenerator {
    public static generate(grid: Grid, numberOfPieces: number, numberOfStars: number, numberOfPrizes: number, numberOfBlockers: number, hidePieces: boolean) : boolean {

        var unusedPentominoes = PentominoLibrary.getOneOfEach();

        for (let i = 0; i < numberOfPieces; i++) {
          var placed = false;
          var pentominoCode : string;
          var attempts = 0;


          do {
            var pentominoIndex = Math.floor(Math.random() * unusedPentominoes.length);
            var pentomino = unusedPentominoes[pentominoIndex];

            var rotations = Math.floor(Math.random() * 3);
            for (var r = 0; r < rotations; r++) {
              pentomino.rotate();
            }
        
            var xOffset: number;
            var yOffset: number;
        
            let firstPlacement = i != 0;

            if (!firstPlacement) {
              xOffset = Math.floor(Math.random() * grid.width);
              yOffset = Math.floor(Math.random() * grid.height);
            } else {
              xOffset = Math.floor(Math.random() * grid.width / 3 + grid.width / 3);
              yOffset = Math.floor(Math.random() * grid.height / 3 + grid.height / 3);
            }
        
            placed = 
              grid.placePentomino(pentomino, xOffset, yOffset, true, firstPlacement);
      
            if (attempts++ > 15000) {
              return false;
            }
          } while (!placed);
      
          if (placed) {
            // remove from available list
            unusedPentominoes.splice(pentominoIndex, 1);
          }
        }
      
        for (let i = 0; i < numberOfStars; i++)
        {
          PuzzleGenerator.placeItem(grid, grid.stars, true, false, false, 15);
        }

        for (let i = 0; i < numberOfPrizes; i++)
        {
          PuzzleGenerator.placeItem(grid, grid.points, true, true, false, 2);
        }

        for (let i = 0; i < numberOfBlockers; i++)
        {
          PuzzleGenerator.placeItem(grid, grid.blocks, false, true, false, 3);
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

  private static placeItem(grid: Grid, placementArray: GridLocation[], placeOnPentomino: boolean, placeOnEmpty: boolean, placeOnOtherObject: boolean, spreadFactor: number) {
        var locations = [] as Array<GridLocation>;

        for (let x = 0; x < grid.width; x++) {
          for (let y = 0; y < grid.height; y++) {
            var locationIsValid = true;
            var loc = new GridLocation(x, y);
            var onPentomino = false;

            for (var pentominoIndex = 0; pentominoIndex < grid.pentominoes.length; pentominoIndex++) {
               onPentomino = onPentomino || grid.pentominoes[pentominoIndex].containsLocation(loc);
            }

            if (!placeOnPentomino && onPentomino) locationIsValid = false;
            if (!placeOnEmpty && !onPentomino) locationIsValid = false;

            if (!placeOnOtherObject) {
              for (var starIndex = 0; starIndex < grid.stars.length; starIndex++) {
                if (grid.stars[starIndex].x == loc.x && grid.stars[starIndex].y == loc.y) {
                  locationIsValid = false;
                }
              }
              for (var blockIndex = 0; blockIndex < grid.blocks.length; blockIndex++) {
                if (grid.blocks[blockIndex].x == loc.x && grid.blocks[blockIndex].y == loc.y) {
                  locationIsValid = false;
                }
              }
              for (var pointIndex = 0; pointIndex < grid.points.length; pointIndex++) {
                if (grid.points[pointIndex].x == loc.x && grid.points[pointIndex].y == loc.y) {
                  locationIsValid = false;
                }
              }
            }

            if (locationIsValid) {
              locations.push({ "x": x, "y": y });
            }
          }
        }

        if (locations.length == 0) {
          console.log("No valid locations for object to place");
        }
        else {
            var loc: GridLocation = new GridLocation(-1,-1);
            var distance: number = -999;

            for (let i = 0; i < spreadFactor; i++)
            {
                var newLoc : GridLocation = locations[Math.floor(Math.random() * locations.length)];
                var newDistance = findDistanceTo(grid, newLoc, placementArray);

                if (newDistance > distance) {
                    loc = newLoc;
                    distance = newDistance;
                }
            }

            placementArray.push(loc);

            
        }
    }
}

function findDistanceTo(grid: Grid, loc: { x: number; y: number; }, placementArray: GridLocation[]) : number {
    var distance = 999;
    
    for (let placedItemIndex = 0; placedItemIndex < placementArray.length; placedItemIndex++)
    {
      var existingItem = placementArray[placedItemIndex];
      var newDist = Math.sqrt(Math.pow(existingItem.x -loc.x, 2) + Math.pow(existingItem.y - loc.y, 2));
      if (newDist < distance) distance = newDist;
    }

    return distance;
}
