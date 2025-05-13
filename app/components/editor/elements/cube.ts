import { ShapeElement, Register } from './base'
import { star } from './utils'
import svg from '../img/cube.svg?raw'

@Register('Cube')
export class Cube extends ShapeElement {
  static override thumbnail = svg

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    rotate(62.3)
    star(0, 0, 1.7 * this.size, 1.98 * this.size, 6)
    pop()
  }
}
