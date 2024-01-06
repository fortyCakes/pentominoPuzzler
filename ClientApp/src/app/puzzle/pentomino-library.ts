import {Pentomino} from "./pentomino"

export abstract class PentominoLibrary {
  public static list = 'filpntuvwxyz';

  public static getOneOfEach(): Pentomino[] {
    return [
      this.f,
      this.i,
      this.l,
      this.p,
      this.n,
      this.t,
      this.u,
      this.v,
      this.w,
      this.x,
      this.y,
      this.z];
}
  
    public static f: Pentomino = new Pentomino('f', [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1]);
    public static i: Pentomino = new Pentomino('i', [1, 1, 1, 1, 1]);
    public static l: Pentomino = new Pentomino('l', [1, 1, 1, 1, 0, 1]);
    public static p: Pentomino = new Pentomino('p', [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1]);
    public static n: Pentomino = new Pentomino('n', [1, 1, 1, 0, 0, 1, 1]);
    public static t: Pentomino = new Pentomino('t', [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    public static u: Pentomino = new Pentomino('u', [1, 0, 1, 0, 0, 1, 1, 1]);
    public static v: Pentomino = new Pentomino('v', [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1]);
    public static w: Pentomino = new Pentomino('w', [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1]);
    public static x: Pentomino = new Pentomino('x', [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1]);
    public static y: Pentomino = new Pentomino('y', [1, 1, 1, 1, 0, 0, 1]);
    public static z: Pentomino = new Pentomino('z', [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1]);
  }
