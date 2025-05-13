import { ShapeElement, Register } from './base'
import svg from '../img/circle.svg?raw'

@Register('Circle')
export class Circle extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    circle(250, 250, 4 * this.size)
    pop()
  }
}
