export function star(e: number, t: number, l: number, n: number, o: number) {
  let a = TWO_PI / o,
    d = a / 2
  beginShape()
  for (let o = 0; o < TWO_PI; o += a) {
    let a = e + cos(o) * n,
      i = t + sin(o) * n
    vertex(a, i),
      (a = e + cos(o + d) * l),
      (i = t + sin(o + d) * l),
      vertex(a, i)
  }
  endShape(CLOSE)
}

export function customShape(e: number, t: number, l: number, n: number) {
  let o = TWO_PI / n
  beginShape()
  for (let n = 0; n < TWO_PI; n += o) {
    let o = e + cos(n) * l,
      a = t + sin(n) * l
    vertex(o, a)
  }
  endShape(CLOSE)
}

export function changeImgColor(
  pixels: number[],
  w: number,
  h: number,
  r: number,
  g: number,
  b: number
) {
  for (let d = 0; d < w; d++)
    for (let i = 0; i < h; i++) {
      let l = 4 * (i * w + d)
      ;(pixels[l + 0] = r), (pixels[l + 1] = g), (pixels[l + 2] = b)
    }
}

export function hex2rgb(hexColor: string): [number, number, number] {
  const arr = hexColor.match(/#(.{2})(.{2})(.{2})/)
  if (!arr) return [0, 0, 0]
  return arr.slice(1).map(hex => parseInt(hex, 16)) as [number, number, number]
}

export function rgb2hex(rgb: [number, number, number]) {
  return '#' + rgb.map(n => n.toString(16).padStart(2, '0')).join('')
}

export function isSVGString(str: string) {
  const svgRegex = /^\s*(?:<\?xml[^>]*>\s*)?<svg[^>]*>[^]*<\/svg>\s*$/i
  return svgRegex.test(str)
}
