import { Component, OnInit } from '@angular/core';
import { Grid } from './grid';
import { PuzzleGenerator } from './puzzle-generator';
import { GridToText } from './GridToText';

@Component({
  selector: 'app-puzzle-component',
  templateUrl: './puzzle.component.html'
})
export class PuzzleComponent implements OnInit {

  width = 12;
  height = 12;

  public generated: boolean;
  public solutionVisible = false;
  public puzzle: Grid;

  ngOnInit() {
    this.generatePuzzle();
  }

  public get puzzleText() {
    return GridToText.getViewOfPuzzle(this.puzzle, this.solutionVisible);
  }

  public generatePuzzle() {

    this.puzzle = new Grid(this.width, this.height);
    this.generated = PuzzleGenerator.generate(this.puzzle, 5, 5, 10, 20, true);

    if (!this.generated) {
      this.puzzle = new Grid(this.width, this.height);
      this.generated = PuzzleGenerator.generate(this.puzzle, 5, 5, 10, 20, true);
    }
    if (!this.generated) {
      this.puzzle = new Grid(this.width, this.height);
      this.generated = PuzzleGenerator.generate(this.puzzle, 5, 5, 10, 20, true);
    }

    this.solutionVisible = false;
  }

  public toggleSolution() {
    this.solutionVisible = !this.solutionVisible;
  }
}
