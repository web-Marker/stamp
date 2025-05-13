import { ShapeElement, Register } from './base'
import svg from '../img/triangle.svg?raw'

@Register('Triangle')
export class Triangle extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    triangle(
      -1.68 * this.size,
      this.size,
      0,
      -2 * this.size,
      1.68 * this.size,
      this.size
    )
    pop()
  }
}
