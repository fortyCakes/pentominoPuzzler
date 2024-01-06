import { Component } from '@angular/core';
import { Grid } from './grid';
import { PuzzleGenerator } from './puzzle-generator';

@Component({
  selector: 'app-puzzle-component',
  templateUrl: './puzzle.component.html'
})
export class PuzzleComponent {

  width = 12;
  height = 12;

  public generated: boolean;
  public puzzle: Grid;

  public generatePuzzle() {
    this.puzzle = new Grid(this.width, this.height);

    this.generated = PuzzleGenerator.generate(this.puzzle, 5, 5, 10, 20, true);

    if (!this.generated) {
      this.generated = PuzzleGenerator.generate(this.puzzle, 5, 5, 10, 20, true);
    }
    if (!this.generated) {
      this.generated = PuzzleGenerator.generate(this.puzzle, 5, 5, 10, 20, true);
    }

  }
}
