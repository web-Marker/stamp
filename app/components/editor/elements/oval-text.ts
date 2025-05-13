import { TextElement, Register, Setting } from './base'
import svg from '../img/oval-text.svg?raw'

@Register('OvalText')
export class OvalText extends TextElement {
  static override thumbnail = svg

  @Setting('Letter spacing', 'slider', { min: 0, max: 100 })
  letterSpacing = 100

  @Setting('Radius', 'slider', { min: 0, max: 100 })
  radius = 60

  @Setting('Start point', 'slider', { min: 0, max: 100 })
  rotation = 0

  override render(r: number, g: number, b: number) {
    if (!this.visible) return
    let m = 3.7 * this.radius,
      u = 1.59 * this.radius,
      c = 0,
      s = []
    const l =
      this.displayName.trim().split(/\s+/).length > 1 &&
      !this.displayName.endsWith(' ')
        ? this.displayName + ' '
        : this.displayName
    textSize(this.fontSize)
    textFont(this.font)
    for (let e = 0; e < l.length; e++) {
      let t = textWidth(l[e]!) + this.letterSpacing
      ' ' === l[e] && (t = 0.7 * this.letterSpacing), s.push(t), (c += t)
    }
    let y = -c / 2 / (m / 1.9) + radians(3.6 * this.rotation)
    push(), translate(250, 250)
    let h = y
    for (let e = 0; e < l.length; e++) {
      let i = s[e]!,
        n = h + i / 2 / (m / 2),
        o = (m / 2.41) * cos(n),
        a = (u / 2.2) * sin(n)
      push(), translate(o, a)
      let d = atan2((u / 2) * cos(n), (-m / 2.2) * sin(n))
      rotate(d)
      stroke(r, g, b)
      fill(r, g, b)
      this.fontStyle.whiten && fill(255, 255, 255)
      textStyle(this.fontStyleStr)
      text(l[e]!, 0, 0)
      pop()
      h += i / (m / 2)
    }
    pop()
  }
}
