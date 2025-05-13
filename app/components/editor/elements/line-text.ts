import { TextElement, Register, Setting } from './base'
import svg from '../img/line-text.svg?raw'

@Register('LineText')
export class LineText extends TextElement {
  static override thumbnail = svg

  @Setting('Horizontal Position', 'slider', { min: 0, max: 100 })
  x = 50

  @Setting('Vertical Position', 'slider', { min: 0, max: 100 })
  y = 50

  @Setting('Start point', 'slider', { min: 0, max: 100 })
  rotation = 50

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    push()
    translate(250, 250)
    rotate((this.rotation - 50) / 15.9)
    stroke(r, g, b)
    fill(r, g, b)
    this.fontStyle.whiten && fill(255, 255, 255)
    textFont(this.font)
    textSize(this.fontSize)
    textStyle(this.fontStyleStr)
    text(this.displayName, ((this.x - 50) / 1) * 3.3, ((this.y - 48) / 1) * 4.2)
    pop()
  }
}
