import { ShapeElement, Register } from './base'
import svg from '../img/rect.svg?raw'

@Register('Rect')
export class Rect extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    rect(0, 0, 4 * this.size, 2 * this.size)
    pop()
  }
}
