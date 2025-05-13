import type { IShowRuler } from './DrawStampTypes'

export class DrawRulerUtils {
  private mmToPixel = 10
  private devicePixelRatio = 1

  constructor(mmToPixel: number) {
    this.mmToPixel = mmToPixel
    this.devicePixelRatio = window.devicePixelRatio || 1
  }

  /**
   * 将坐标对齐到设备像素，避免模糊
   */
  private alignCoordinate(coord: number): number {
    return Math.round(coord) + 0.5
  }

  /**
   * 绘制标尺
   * @param rulerLength 标尺长度
   * @param rulerSize 标尺宽度
   * @param isHorizontal 是否为水平标尺
   */
  drawRuler(
    ctx: CanvasRenderingContext2D,
    ruler: IShowRuler,
    scale: number,
    rulerLength: number,
    rulerSize: number,
    isHorizontal: boolean
  ) {
    if (!ruler.showRuler) return

    const mmPerPixel = 1 / this.mmToPixel

    ctx.save()
    ctx.fillStyle = 'lightgray'
    if (isHorizontal) {
      ctx.fillRect(0, 0, rulerLength, rulerSize)
    } else {
      ctx.fillRect(0, 0, rulerSize, rulerLength)
    }

    ctx.fillStyle = 'black'
    ctx.font = '10px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    const step = this.mmToPixel // 1mm的像素长度
    const maxMM = Math.ceil(((rulerLength - rulerSize) * mmPerPixel) / scale)

    for (let mm = 0; mm <= maxMM; mm++) {
      const pos = mm * step * scale + rulerSize

      if (mm % 5 === 0) {
        ctx.beginPath()
        if (isHorizontal) {
          ctx.moveTo(this.alignCoordinate(pos), 0)
          ctx.lineTo(this.alignCoordinate(pos), rulerSize * 0.8)
        } else {
          ctx.moveTo(0, this.alignCoordinate(pos))
          ctx.lineTo(rulerSize * 0.8, this.alignCoordinate(pos))
        }
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.save()
        if (isHorizontal) {
          ctx.fillText(mm.toString(), pos, rulerSize * 0.8)
        } else {
          ctx.translate(rulerSize * 0.8, pos)
          ctx.rotate(-Math.PI / 2)
          ctx.fillText(mm.toString(), 0, 0)
        }
        ctx.restore()
      } else {
        ctx.beginPath()
        if (isHorizontal) {
          ctx.moveTo(this.alignCoordinate(pos), 0)
          ctx.lineTo(this.alignCoordinate(pos), rulerSize * 0.6)
        } else {
          ctx.moveTo(0, this.alignCoordinate(pos))
          ctx.lineTo(rulerSize * 0.6, this.alignCoordinate(pos))
        }
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    ctx.restore()
  }

  /**
   * 绘制全标尺
   */
  showCrossDashLine(
    ctx: CanvasRenderingContext2D,
    ruler: IShowRuler,
    scale: number,
    rulerWidth: number,
    rulerHeight: number,
    width: number,
    height: number
  ) {
    if (!ruler.showDashLine) return

    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.strokeStyle = '#000' // 浅灰色
    ctx.lineWidth = 0.2

    const step = this.mmToPixel * 1 // 1mm的像素长度

    // 绘制垂直线
    for (let x = rulerWidth; x < width; x += step * scale) {
      const alignedX = this.alignCoordinate(x)
      ctx.beginPath()
      ctx.moveTo(alignedX, rulerHeight)
      ctx.lineTo(alignedX, height)
      ctx.stroke()
    }

    // 绘制水平线
    for (let y = rulerHeight; y < height; y += step * scale) {
      const alignedY = this.alignCoordinate(y)
      ctx.beginPath()
      ctx.moveTo(rulerWidth, alignedY)
      ctx.lineTo(width, alignedY)
      ctx.stroke()
    }

    ctx.restore()
  }

  /**
   * 绘制当前位置的十字线
   */
  drawPositionCrossLines = (
    offscreenCanvas: HTMLCanvasElement,
    mainCanvas: HTMLCanvasElement,
    rulerWidth: number,
    rulerHeight: number,
    x: number,
    y: number,
    color: string
  ) => {
    const canvas = offscreenCanvas
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清除之前绘制的内容
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 对齐到像素
    const alignedX = this.alignCoordinate(x)
    const alignedY = this.alignCoordinate(y)
    const alignedRulerWidth = this.alignCoordinate(rulerWidth)
    const alignedRulerHeight = this.alignCoordinate(rulerHeight)

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1

    // 绘制水平线
    ctx.moveTo(alignedRulerWidth, alignedY)
    ctx.lineTo(canvas.width, alignedY)

    // 绘制垂直线
    ctx.moveTo(alignedX, alignedRulerHeight)
    ctx.lineTo(alignedX, canvas.height)

    ctx.stroke()

    // 将离屏canvas的内容绘制到主canvas上
    if (mainCanvas) {
      const mainCtx = mainCanvas.getContext('2d')
      if (mainCtx) {
        mainCtx.drawImage(canvas, 0, 0)
      }
    }
  }

  drawCurrentPositionText = (
    ctx: CanvasRenderingContext2D,
    mmX: number,
    mmY: number,
    scale: number,
    rulerWidth: number,
    rulerHeight: number
  ) => {
    // 显示坐标
    ctx.fillStyle = 'black'
    ctx.font = 'bold 12px Arial'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    const showPositionX = mmX / scale
    const showPositionY = mmY / scale
    ctx.fillText(
      `${showPositionX.toFixed(1)}mm, ${showPositionY.toFixed(
        1
      )}mm, scale: ${scale.toFixed(2)}`,
      rulerWidth + 5,
      rulerHeight + 5
    )
  }
}
