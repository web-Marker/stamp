import { ShapeElement, Register } from './base'
import { customShape } from './utils'
import svg from '../img/pentagon.svg?raw'

@Register('Pentagon')
export class Pentagon extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    rotate(60)
    drawingContext.setLineDash(this.lineDash)
    customShape(0, 0, 2 * this.size, 5)
    pop()
  }
}
