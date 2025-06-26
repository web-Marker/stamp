import { StampElement, ElementAs, Register, Setting } from './base'
import { changeImgColor, rgb2hex, isSVGString } from './utils'
import type { Image as P5Image } from 'p5'
import { Canvg, type Element } from 'canvg'

const changeCanvgColor = (el: Element, color: string) => {
  let changed = false
  ;['fill', 'stroke'].forEach((attr) => {
    const property = el.getAttribute(attr)
    if (property.hasValue() && property.getValue() !== 'none') {
      property.setValue(color)
      changed = true
    }
  })
  el.children.forEach((child) => {
    const _changed = changeCanvgColor(child, color)
    changed = changed || _changed
  })
  return changed
}

@Register('Image')
export class Image extends StampElement {
  static override as = ElementAs.Image
  static cache = new Map<string, P5Image | Promise<P5Image>>()

  static async loadImage(src: string) {
    let result = this.cache.get(src)
    if (!result) {
      result = new Promise((resolve, reject) => {
        loadImage(
          src,
          (img) => {
            this.cache.set(src, img)
            resolve(img)
          },
          reject,
        )
      })
      this.cache.set(src, result)
    }
    return result
  }

  static async createImage(src: string) {
    if (!isSVGString(src)) {
      await this.loadImage(src)
    }
    return new Image(src)
  }

  constructor(public src = '') {
    super()
    Object.defineProperty(this, 'src', {
      get: () => src,
      set: (value) => {
        src = value
        if (this.isSVG) {
          const canvg = Canvg.fromString(drawingContext, this.src)
          // 不定义为实例属性是避免后续被JSON.stringify序列化
          this.getCanvg = () => canvg
        } else {
          this.getCanvg = () => null
        }
      },
      enumerable: true,
    })
    this.src = src
  }

  private getCanvg = () => null as null | Canvg

  @Setting('Size', 'slider', { min: 1, max: 150 })
  size = 30

  @Setting('Horizontal Position', 'slider', { min: 0, max: 100 })
  x = 50

  @Setting('Vertical Position', 'slider', { min: 0, max: 100 })
  y = 50

  @Setting('Rotation', 'slider', { min: 0, max: 100 })
  rotation = 0

  override get thumbnail() {
    return this.src
  }

  get isSVG() {
    return isSVGString(this.src)
  }

  override render(r: number, g: number, b: number) {
    if (!this.visible || !this.src) return
    if (this.isSVG) return this.renderSVG(r, g, b)
    const imgObj = Image.cache.get(this.src) || Image.loadImage(this.src)
    if (imgObj instanceof Promise) return
    push()
    imageMode(CENTER)
    translate(250, 250)
    rotate(this.rotation / 15.92)
    image(
      imgObj,
      ((this.x - 50) / 1) * 3.8,
      ((this.y - 50) / 1) * 3.8,
      3.8 * this.size,
      3.8 * this.size * (imgObj.height / imgObj.width),
    )
    imgObj.loadPixels()
    changeImgColor(imgObj.pixels, imgObj.width, imgObj.height, r, g, b)
    imgObj.updatePixels()
    pop()
  }

  renderSVG(r: number, g: number, b: number) {
    const canvg = this.getCanvg()
    if (!canvg) return
    const root: Element = (canvg as any).documentElement
    // @ts-ignore
    canvg.screen.ctx = drawingContext
    const { width, height } = canvg.screen.viewPort
    const aspectRatio = width / height
    push()
    translate(250, 250)
    rotate(this.rotation / 15.92)
    if (!changeCanvgColor(root, rgb2hex([r, g, b]))) {
      root.getAttribute('stroke', true).setValue(rgb2hex([r, g, b]))
      root.getAttribute('fill', true).setValue(rgb2hex([r, g, b]))
    }
    canvg.resize(3.8 * this.size)
    canvg.render({
      ignoreClear: true,
      ignoreDimensions: true,
      offsetX: (this.x - 50) * 3.8 - (3.8 * this.size) / 2,
      offsetY: (this.y - 50) * 3.8 - (3.8 * this.size) / aspectRatio / 2,
    })
    pop()
  }
}
