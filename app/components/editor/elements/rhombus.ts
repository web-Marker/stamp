import { ShapeElement, Register } from './base'
import { customShape } from './utils'
import svg from '../img/rhombus.svg?raw'

@Register('Rhombus')
export class Rhombus extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    customShape(0, 0, 2 * this.size, 4)
    pop()
  }
}
