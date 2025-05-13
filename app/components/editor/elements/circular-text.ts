import { TextElement, Register, Setting } from './base'
import svg from '../img/circular-text.svg?raw'

@Register('CircularText')
export class CircularText extends TextElement {
  static override thumbnail = svg

  @Setting('Letter spacing', 'slider', { min: 0, max: 100 })
  letterSpacing = 100

  @Setting('Radius', 'slider', { min: 0, max: 100 })
  radius = 60

  @Setting('Start point', 'slider', { min: 0, max: 100 })
  rotation = 0

  @Setting('Invert', 'checkbox')
  invert = false

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    smooth()
    const l =
      this.displayName.split(' ').length < 2
        ? this.displayName
        : ' ' + this.displayName
    let m = radians(3.6 * this.letterSpacing) / l.length
    push()
    textFont(this.font)
    translate(250, 250)
    rotate(radians(3.6 * this.rotation))
    for (let i = 0; i < l.length; i++) {
      stroke(r, g, b)
      fill(r, g, b)
      this.fontStyle.whiten && fill(255, 255, 255)
      push()
      textSize(this.fontSize)
      textStyle(this.fontStyleStr)
      if (this.invert) {
        rotate(-i * m - 0.66)
        rotate(this.radius / 666)
        text(l[i]!, 0, 2 * this.radius + this.fontSize / 2)
      } else {
        rotate(i * m)
        rotate(this.radius / 666)
        text(l[i]!, 0, -2 * this.radius)
      }
      pop()
    }
    pop()
  }
}
