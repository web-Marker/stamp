import { ShapeElement, Register } from './base'
import { customShape } from './utils'
import svg from '../img/hexagon.svg?raw'

@Register('Hexagon')
export class Hexagon extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    customShape(0, 0, 2 * this.size, 6)
    pop()
  }
}
