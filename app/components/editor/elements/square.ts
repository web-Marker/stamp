import { ShapeElement, Register } from './base'
import svg from '../img/square.svg?raw'

@Register('Square')
export class Square extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    rect(0, 0, 3.96 * this.size, 3.96 * this.size)
    pop()
  }
}
