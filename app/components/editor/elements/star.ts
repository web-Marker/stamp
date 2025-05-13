import { ShapeElement, Register } from './base'
import { star } from './utils'
import svg from '../img/star.svg?raw'

@Register('Star')
export class Star extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    rotate(60)
    star(0, 0, 0.95 * this.size, 2 * this.size, 5)
    pop()
  }
}
