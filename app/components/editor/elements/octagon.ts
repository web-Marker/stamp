import { ShapeElement, Register } from './base'
import { customShape } from './utils'
import svg from '../img/octagon.svg?raw'

@Register('Octagon')
export class Octagon extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    rotate(75)
    customShape(0, 0, 2.15 * this.size, 8)
    pop()
  }
}
