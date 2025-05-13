import { ShapeElement, Register } from './base'
import { star } from './utils'
import svg from '../img/badge-star.svg?raw'

@Register('BadgeStar')
export class BadgeStar extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    rotate(54.975)
    star(0, 0, 1.76 * this.size, 2 * this.size, 18)
    pop()
  }
}
