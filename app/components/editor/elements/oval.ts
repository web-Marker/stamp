import { ShapeElement, Register } from './base'
import svg from '../img/oval.svg?raw'

@Register('Oval')
export class Oval extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    ellipse(0, 0, 4 * this.size, 2 * this.size)
    pop()
  }
}
