import { cloneDeep } from 'lodash-es'

export const enum ElementAs {
  Unset = '',
  Shape = 'shape',
  Text = 'text',
  Image = 'image',
}

interface StampElementSetting {
  label: string
  name: string
  type: SettingType
  props?: Record<string, any>
}

type SettingType =
  | 'slider'
  | 'input'
  | 'checkbox'
  | 'font-select'
  | 'font-style'

let uid = 0

const elements = new Map<string, new () => StampElement>()

export abstract class StampElement {
  static as = ElementAs.Unset
  static thumbnail = ''
  static settings: StampElementSetting[] = []

  static fromJSON(json: string) {
    const { localName, uid, ...props } = JSON.parse(json) as StampElement
    const Element = elements.get(localName)
    if (!Element) return null
    const element = new Element()
    Object.assign(element, props)
    return element
  }

  get settings() {
    return (this.constructor as typeof StampElement).settings
  }
  get thumbnail() {
    return (this.constructor as typeof StampElement).thumbnail
  }
  get displayName() {
    return this.localName
  }

  uid = uid++
  visible = true

  constructor() {
    Object.defineProperty(this, 'localName', {
      value: this.localName,
      writable: false,
      enumerable: true,
    })
  }

  declare localName: string
  abstract render(r: number, g: number, b: number): void
}

export abstract class ShapeElement extends StampElement {
  static override as = ElementAs.Shape

  @Setting('Size', 'slider', { min: 1, max: 150 })
  size = 80

  @Setting('Stroke-width', 'slider', { min: 1, max: 100 })
  strokeWidth = 6

  @Setting('Line Break', 'slider', { min: 0, max: 99 })
  lineBreak = 0

  get lineDash() {
    const seg = this.lineBreak && 100 - 1 * this.lineBreak
    return [seg, seg]
  }
}

export abstract class TextElement extends StampElement {
  static override as = ElementAs.Text

  @Setting('Text', 'input', { placeholder: 'Enter your text' })
  text = ''

  @Setting('Font', 'font-select')
  font = 'Aria'

  @Setting('Style', 'font-style')
  fontStyle = {
    bold: false,
    italic: false,
    whiten: false,
  }

  @Setting('Font size', 'slider', { min: 1, max: 100 })
  fontSize = 35

  override get displayName() {
    return this.text || 'Enter your text'
  }

  get fontStyleStr() {
    const { bold, italic } = this.fontStyle
    return bold && italic ? BOLDITALIC : bold ? BOLD : italic ? ITALIC : NORMAL
  }
}

export function Setting(
  label: string,
  type: SettingType,
  props?: Record<string, any>,
) {
  return (proto: any, name: string) => {
    const ctor = proto.constructor
    if (!Object.prototype.hasOwnProperty.call(ctor, 'settings')) {
      ctor.settings = cloneDeep(ctor.settings || [])
    }
    const settings: StampElementSetting[] = ctor.settings
    const setting: StampElementSetting = { label, name, type, props }
    const exsits = settings.find(item => item.name === name)
    if (exsits) {
      Object.assign(exsits, setting)
    }
    else {
      settings.push(setting)
    }
  }
}

export function Deprecated(proto: any, name: string) {
  const ctor = proto.constructor
  if (!Object.prototype.hasOwnProperty.call(ctor, 'settings')) {
    ctor.settings = cloneDeep(ctor.settings || [])
  }
  const settings: StampElementSetting[] = ctor.settings
  const idx = settings.findIndex(item => item.name === name)
  if (idx > -1) {
    settings.splice(idx, 1)
  }
}

export function Register(name: string) {
  return (target: new () => StampElement) => {
    elements.set(name, target)
    Object.defineProperty(target.prototype, 'localName', {
      value: name,
      writable: false,
      enumerable: true,
    })
  }
}
