import { ShapeElement, Register } from './base'
import { star } from './utils'
import svg from '../img/nonagon.svg?raw'

@Register('Nonagon')
export class Nonagon extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    rotate(18.002)
    star(0, 0, 1.5 * this.size, 2 * this.size, 9)
    pop()
  }
}
