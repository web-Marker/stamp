import { ShapeElement, Register, Setting } from './base'
import svg from '../img/line.svg?raw'

@Register('Line')
export class Line extends ShapeElement {
  static override thumbnail = svg

  @Setting('Horizontal Position', 'slider', { min: 0, max: 100 })
  x = 50

  @Setting('Vertical Position', 'slider', { min: 0, max: 100 })
  y = 50

  @Setting('Rotation', 'slider', { min: 0, max: 100 })
  rotation = 0

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    stroke(r, g, b)
    translate(250, 250)
    strokeCap(SQUARE)
    strokeWeight(this.strokeWidth)
    drawingContext.setLineDash(this.lineDash)
    rotate(this.rotation / 15.92)
    line(
      2 * -this.size + (4 * this.x - 200),
      4 * this.y - 200,
      2 * this.size + (4 * this.x - 200),
      4 * this.y - 200
    )
    pop()
  }
}
