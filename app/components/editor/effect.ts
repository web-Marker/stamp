/** 做旧效果 */
export class AgingEffect {
  enable = false
  get intensity() {
    return this._intensity
  }
  set intensity(value) {
    this._intensity = value
    this.refresh()
  }

  private _intensity = 50
  private _params: any[] = []

  refresh() {
    this._params.length = 0
  }

  apply(ctx: CanvasRenderingContext2D) {
    if (!this.enable) return
    const { width, height } = ctx.canvas
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data

    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.max(width, height) / 2

    // 如果需要刷新或者参数数组为空,则重新生成参数
    if (this._params.length === 0) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4
          const distanceFromCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          )
          if (distanceFromCenter <= radius) {
            // 检查像素是否不是透明的（alpha 通道不为 0）
            if (data[index + 3]) {
              const intensityFactor = this.intensity / 100
              const seed = Math.random()
              this._params.push({
                x,
                y,
                noiseSize: Math.random() * 3 + 1,
                noise: Math.random() * 200 * intensityFactor,
                strongNoiseSize: Math.random() * 5 + 2,
                strongNoise: Math.random() * 250 * intensityFactor + 5,
                fade: Math.random() * 50 * intensityFactor,
                seed: seed,
              })
            }
          }
        }
      }
    }

    // 使用保存的参数应用做旧效果
    this._params.forEach(param => {
      const {
        x,
        y,
        noiseSize,
        noise,
        strongNoiseSize,
        strongNoise,
        fade,
        seed,
      } = param
      const index = (Math.round(y) * width + Math.round(x)) * 4

      if (seed < 0.4) {
        this.addCircularNoise(data, width, x, y, noiseSize, noise, true)
      }

      if (seed < 0.05) {
        this.addCircularNoise(
          data,
          width,
          x,
          y,
          strongNoiseSize,
          strongNoise,
          true
        )
      }

      if (seed < 0.2) {
        data[index + 3] = Math.max(0, data[index + 3]! - fade) // 修改这里，只改变透明度
      }
    })

    ctx.putImageData(imageData, 0, 0)
  }

  private addCircularNoise(
    data: Uint8ClampedArray,
    width: number,
    x: number,
    y: number,
    size: number,
    intensity: number,
    transparent: boolean = false
  ) {
    const radiusSquared = (size * size) / 4
    for (let dy = -size / 2; dy < size / 2; dy++) {
      for (let dx = -size / 2; dx < size / 2; dx++) {
        if (dx * dx + dy * dy <= radiusSquared) {
          const nx = Math.round(x + dx)
          const ny = Math.round(y + dy)
          const nIndex = (ny * width + nx) * 4
          if (nIndex >= 0 && nIndex < data.length) {
            if (transparent) {
              data[nIndex + 3] = Math.max(0, data[nIndex + 3]! - intensity) // 只改变透明度
            } else {
              data[nIndex] = Math.min(255, data[nIndex]! + intensity)
              data[nIndex + 1] = Math.min(255, data[nIndex + 1]! + intensity)
              data[nIndex + 2] = Math.min(255, data[nIndex + 2]! + intensity)
            }
          }
        }
      }
    }
  }
}
