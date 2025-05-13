<template>
  <div id="stamp-editor">
    <!-- 顶部工具栏(原左侧工具栏) -->
    <div class="h-26 bg-white border-b border-gray-200 shadow-sm">
      <div class="mx-auto flex flex-col h-full">
        <!-- 第一行：标题 -->
        <div class="flex items-center h-12 border-b border-gray-100 pb-2">
          <!-- Stamp template -->
          <div
            class="flex items-center cursor-pointer group px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            @click="templatesDialog = true"
          >
            <el-icon
              class="text-[14px] text-gray-600 group-hover:text-blue-600"
            >
              <Search />
            </el-icon>
            <span
              class="ml-1.5 text-base font-medium text-gray-700 group-hover:text-blue-600 select-none animate-pulse"
            >
              Select Template
              <el-tag
                size="small"
                class="ml-2"
                type="info"
                effect="light"
              >
                Click to change
              </el-tag>
            </span>
          </div>
          <div class="flex items-center justify-between ml-2 space-x-5">
            <!-- 印章颜色 -->
            <el-color-picker
              v-model="stampConfig.primaryColor"
              :predefine="colorPresets"
            />
            <el-button
              :class="{ 'el-btn-active': configureEffect }"
              style="--el-button-border-color: #eee"
              @click="configureEffect = true"
            >
              <el-icon size="14">
                <MagicStick />
              </el-icon>
              <span class="text-[12px]">Aging Effect</span>
            </el-button>
            <el-tooltip placement="top" content="New stamp">
              <el-icon
                class="hover:bg-gray-50 hover:text-blue-600 rounded-md p-1"
                role="button"
                size="32"
                @click="reset"
              >
                <Refresh />
              </el-icon>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="flex justify-between h-[500px] mt-4">
      <!-- 左侧区域 -->
      <div class="bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
        <div class="text-[16px] bg-slate-50 p-2">
          Elements
        </div>
        <div class="flex-1 flex overflow-hidden">
          <div class="border-r">
            <el-popover
              v-for="(Els, key) of groupedElementCtors"
              :key="key"
              placement="left"
              width="fit-content"
              trigger="click"
            >
              <template #reference>
                <div
                  v-if="key === ElementAs.Image"
                  class="p-3 text-center text-sm cursor-pointer"
                >
                  <SvgImage class="inline-block" />
                  <p>Image</p>
                </div>
                <div
                  v-if="key === ElementAs.Shape"
                  class="p-3 text-center text-sm cursor-pointer"
                >
                  <SvgShape class="inline-block" />
                  <p>Shape</p>
                </div>
                <div
                  v-if="key === ElementAs.Text"
                  class="p-3 text-center text-sm cursor-pointer"
                >
                  <SvgText class="inline-block" />
                  <p>Text</p>
                </div>
              </template>
              <div class="h-full flex flex-col">
                <div class="flex-1 grid grid-cols-3 gap-2">
                  <template v-if="key === ElementAs.Image">
                    <div
                      v-for="(src, idx) of imagePresets"
                      :key="idx"
                      class="flex items-center justify-center w-20 h-20 border-1 rounded cursor-pointer hover:bg-slate-50"
                      @click="addImageElement(src)"
                    >
                      <img class="w-[80%] h-[80%]" :src="src">
                    </div>
                  </template>
                  <template v-else>
                    <div
                      v-for="(El, idx) of Els"
                      :key="idx"
                      class="flex items-center justify-center w-20 h-20 border-1 rounded cursor-pointer hover:bg-slate-50"
                      @click="addElement(new El())"
                      v-html="El.thumbnail"
                    />
                  </template>
                </div>
                <div v-if="key === ElementAs.Image" class="mt-3 relative">
                  <label
                    for="file"
                    role="button"
                    class="flex items-center justify-center h-9 w-full rounded-[4px] bg-[#E2E2E2] hover:bg-[#d5d5d5] text-black font-medium text-sm"
                  >
                    <el-icon :size="16"><Upload /></el-icon>
                    <span class="ml-1">Upload</span>
                  </label>
                  <input
                    id="file"
                    class="hidden"
                    type="file"
                    accept=".png,.webp,.svg"
                    @change="addCustomImage"
                  >
                </div>
              </div>
            </el-popover>
          </div>
          <div class="w-[240px]">
            <el-scrollbar height="100%">
              <div class="space-y-2 p-2" @mouseleave="highlightElement = null">
                <div
                  v-for="(el, i) of stampElements"
                  :key="el.uid"
                  class="w-full flex items-center space-x-1 cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md text-gray-600 hover:text-gray-900 text-sm"
                  :class="{
                    '!text-gray-300': !el.visible,
                    'bg-gray-100 text-gray-900': el === activeElement,
                  }"
                  @click="focusElement(el)"
                  @mouseenter.stop="highlightElement = el"
                >
                  <el-icon :size="18" @click="el.visible = !el.visible">
                    <component :is="el.visible ? View : Hide" />
                  </el-icon>
                  <div
                    v-if="isSVGString(el.thumbnail)"
                    class="thumbnail"
                    v-html="el.thumbnail"
                  />
                  <img v-else class="thumbnail" :src="el.thumbnail">
                  <span class="flex-1 ellipsis">{{ el.displayName }}</span>
                  <el-icon
                    :size="18"
                    @click.stop="removeElement(el, i)"
                  >
                    <Delete />
                  </el-icon>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>

      <!-- Canvas 区域 -->
      <div
        class="relative w-[500px] bg-slate-50 rounded-lg shadow-md overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"
          style="background-size: 10px 10px"
        />
        <canvas ref="mainCanvas" class="relative w-full h-full" />
      </div>

      <!-- 右侧设置区域 -->
      <div class="w-[280px] bg-white rounded-lg shadow-md overflow-x-hidden">
        <el-scrollbar height="100%">
          <!-- Stamp aging 设置 -->
          <div v-if="configureEffect" class="space-y-4 py-4 px-6">
            <!-- 启用做旧效果 -->
            <div class="flex justify-between items-center">
              <label class="min-w-[120px] text-sm text-gray-600">Enable Aging Effect</label>
              <el-switch v-model="stampConfig.aging.enable" />
            </div>

            <!-- 做旧强度 -->
            <div v-if="stampConfig.aging.enable">
              <label class="min-w-[120px] text-sm text-gray-600">Aging Intensity</label>
              <el-slider
                v-model="stampConfig.aging.intensity"
                :min="0"
                :max="100"
              />
            </div>

            <div>
              <!-- 刷新按钮 -->
              <el-button type="primary" @click="stampConfig.aging.refresh()">
                Refresh Aging
              </el-button>
            </div>
          </div>

          <div v-else-if="activeElement" class="space-y-4 py-4 px-6">
            <div v-for="item of activeElement.settings" :key="item.name">
              <label class="min-w-[120px] text-sm text-gray-600">{{
                item.label
              }}</label>
              <el-input
                v-if="item.type === 'input'"
                v-model="(activeElement as any)[item.name]"
                v-bind="item.props"
              />
              <el-slider
                v-if="item.type === 'slider'"
                v-model="(activeElement as any)[item.name]"
                v-bind="item.props"
              />
              <el-checkbox
                v-if="item.type === 'checkbox'"
                v-model="(activeElement as any)[item.name]"
                v-bind="item.props"
                size="large"
                class="ml-4 align-middle"
              />
              <el-select
                v-if="item.type === 'font-select'"
                v-model="(activeElement as any)[item.name]"
                v-bind="item.props"
                filterable
                @change="font = $event"
              >
                <el-option
                  v-for="font in systemFonts"
                  :key="font"
                  :label="font"
                  :value="font"
                  :style="{ fontFamily: font }"
                />
              </el-select>
              <div v-if="item.type === 'font-style'">
                <el-tooltip placement="top" content="bold">
                  <el-checkbox-button
                    v-model="(activeElement as any)[item.name].bold"
                  >
                    <span
                      class="font-bold inline-block align-middle w-[18px] leading-[18px]"
                      style="font-family: 'Times New Roman'; font-size: 16px"
                    >B</span>
                  </el-checkbox-button>
                </el-tooltip>
                <el-tooltip placement="top" content="italic">
                  <el-checkbox-button
                    v-model="(activeElement as any)[item.name].italic"
                  >
                    <span
                      class="italic inline-block align-middle w-[18px] leading-[18px]"
                      style="font-family: 'Times New Roman'; font-size: 16px"
                    >I</span>
                  </el-checkbox-button>
                </el-tooltip>
                <el-tooltip placement="top" content="whiten">
                  <el-checkbox-button
                    v-model="(activeElement as any)[item.name].whiten"
                  >
                    <SvgWhiten width="18" height="18" />
                  </el-checkbox-button>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="templatesDialog"
    title="Templates"
    width="auto"
    center
    align-center
    class="!px-0"
  >
    <el-scrollbar max-height="60vh">
      <div class="grid grid-cols-4 px-4">
        <div
          v-for="(template, key) of templates"
          :key="key"
          class="flex justify-center items-center w-44 h-44 cursor-pointer hover:bg-slate-50"
          @click="chooseTemplate(template)"
        >
          <img
            class="w-full h-full"
            :src="templateImgs[key.replace('.json', '.png')]"
          >
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import {
  Refresh,
  Search,
  Upload,
  Delete,
  MagicStick,
  View,
  Hide,
} from '@element-plus/icons-vue'
import { groupBy } from 'lodash-es'
import type { default as P5, Renderer } from 'p5'
import C2S from 'canvas2svg'
import { StampElement, ElementAs, TextElement } from './elements/base'
import * as elementCtors from './elements'
import { hex2rgb, isSVGString } from './elements/utils'
import SvgShape from './img/a-shape.svg'
import SvgText from './img/a-text.svg'
import SvgImage from './img/a-image.svg'
import SvgWhiten from './img/whiten.svg'
// @ts-ignore
import { AgingEffect } from './effect'
import AsyncTask from '@/utils/async-task'
import { frontDownload } from '@/utils/common'
import { getSystemFonts } from '@/utils/fontUtils'

// C2S.prototype.scale = function () {} // 不需要处理缩放
C2S.prototype.clearRect = function () {} // 会绘制一个白色的矩形，不需要
C2S.prototype.setLineDash = function (dash: [number, number]) {
  this.__currentElement.setAttribute('stroke-dasharray', dash.join(' '))
}

interface StampConfig {
  primaryColor: string
  aging: AgingEffect
}

interface StampTemplate extends StampConfig {
  elements: object[]
}

const colorPresets = ['#1b49ac', '#ff0000', '#00eeee', '#000000', '#c71585']
const imagePresets = Object.values(
  import.meta.glob('./img/*.png', {
    eager: true,
    import: 'default',
    query: '?no-inline',
  }),
) as string[]

const templates = import.meta.glob('./templates/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, StampTemplate>
const templateImgs = import.meta.glob('./templates/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const STORAGE_SNAPSHOT = 'stamp_snapshot'
const CANVAS_SIZE = 500

const templatesDialog = ref(false)
const canvasLoading = ref(false)

const mainCanvas = ref<HTMLCanvasElement | null>(null)
let mainCtx: CanvasRenderingContext2D
let watermarkCanvas: HTMLCanvasElement | undefined
let p5Renderer: Renderer
let c2sTask: AsyncTask | undefined // canvas-to-svg task
let _drawingContext: any

const systemFonts = ref<string[]>([])
const font = ''

const stampConfig = reactive<StampConfig>({
  primaryColor: colorPresets[0]!,
  aging: new AgingEffect(),
})

const groupedElementCtors = groupBy(
  Object.values(elementCtors),
  Element => Element.as,
)

const configureEffect = ref(false)
const stampElements = ref<StampElement[]>([])
const activeElement = ref<StampElement>()
let highlightElement: StampElement | null

watch(stampElements, () => stampConfig.aging.refresh(), { deep: true })

const addElement = (el: StampElement) => {
  if (el instanceof TextElement && font) {
    el.font = font
  }
  stampElements.value.unshift(el)
  activeElement.value = stampElements.value[0]
  configureEffect.value = false
}

const addImageElement = async (src: string) => {
  canvasLoading.value = true
  const img = await elementCtors.Image.createImage(src).finally(
    () => (canvasLoading.value = false),
  )
  addElement(img)
}

const addCustomImage = async (e: any) => {
  const file: File = e.target.files[0]
  e.target.value = ''
  if (!file.type.startsWith('image')) {
    return ElMessage.error('Only images are allowed.')
  }
  let src = URL.createObjectURL(file)
  if (file.type === 'image/svg+xml') {
    src = await fetch(src).then(res => res.text())
  }
  addImageElement(src)
}

const removeElement = (el: StampElement, idx: number) => {
  stampElements.value.splice(idx, 1)
  if (el === activeElement.value) {
    activeElement.value
      = stampElements.value[idx]
        || stampElements.value[stampElements.value.length - 1]
  }
}

const focusElement = (el: StampElement) => {
  activeElement.value = el
  highlightElement = null
  configureEffect.value = false
}

const reset = async () => {
  if (!stampElements.value.length) return
  await ElMessageBox.confirm(
    '<div class="text-lg py-3">Your progress will be lost. Proceed?</div>',
    {
      type: 'warning',
      dangerouslyUseHTMLString: true,
    },
  )
  stampElements.value = []
  activeElement.value = undefined
}

// p5.js sketch
const initSketch = () => {
  window.setup = () => {
    p5Renderer = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    p5Renderer.elt.remove()
    textAlign(CENTER)
    rectMode(CENTER)
    const canvas = mainCanvas.value!
    canvas.width = p5Renderer.elt.width
    canvas.height = p5Renderer.elt.height
    mainCtx = canvas.getContext('2d')!
    _drawingContext = drawingContext
  }
  window.draw = () => {
    clear(), noFill()
    ;[...stampElements.value].reverse().forEach((el) => {
      const hexColor
        = !highlightElement || highlightElement === el
          ? stampConfig.primaryColor
          : '#d9d9d9'
      const [r, g, b] = hex2rgb(hexColor)
      el.render(r, g, b)
    })
    c2sTask?.done()
    stampConfig.aging.apply(_drawingContext)

    const canvas = mainCanvas.value!
    mainCtx.clearRect(0, 0, canvas.width, canvas.height)
    mainCtx.drawImage(p5Renderer.elt, 0, 0)
    if (!watermarkCanvas) {
      watermarkCanvas = watermark()
    }
    mainCtx.drawImage(watermarkCanvas, 0, 0)
  }
  new (p5 as any)()
}

onMounted(() => {
  initSketch()
  loadSystemFonts()
  if (!loadTemplateFromStorage()) {
    const t = Object.values(templates)[0]
    t && loadTemplate(t)
  }
})

onBeforeUnmount(() => {
  saveTemplateToStorage()
  p5.instance?.remove()
})

const canvas2svg = async () => {
  const size = CANVAS_SIZE * pixelDensity()
  const ctx = new C2S(size, size)
  ctx.getSvg().removeAttribute('width')
  ctx.getSvg().removeAttribute('height')
  ctx.getSvg().setAttribute('viewBox', `0 0 ${size} ${size}`)
  if (!stampConfig.aging.enable) {
    p5Renderer.drawingContext = window.drawingContext = new Proxy(
      drawingContext,
      {
        get(target, propKey) {
          const res = Reflect.get(target, propKey)
          return typeof res === 'function'
            ? new Proxy(res, {
              apply(target2, thisArg, args) {
                jobs.push(() => ctx[propKey]?.apply(ctx, args))
                return Reflect.apply(target2, target, args)
              },
            })
            : res
        },
        set(target, propKey, value) {
          jobs.push(() => (ctx[propKey] = value))
          return Reflect.set(target, propKey, value)
        },
      },
    )

    const jobs: (() => void)[] = []
    c2sTask = new AsyncTask()
    await c2sTask.promise
    p5Renderer.drawingContext = window.drawingContext = _drawingContext
    jobs.forEach(job => job())
  }
  else {
    // svg不支持做旧效果
    ctx.drawImage(p5Renderer.elt, 0, 0)
  }
  return ctx.getSerializedSvg() as string
}

// 添加水印的方法
const watermark = () => {
  const canvas = document.createElement('canvas'),
    W = CANVAS_SIZE * pixelDensity(),
    H = W
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  // 设置水印样式
  ctx.globalAlpha = 0.1 // 水印透明度
  ctx.fillStyle = '#999'
  ctx.font = '32px Arial'

  // 计算水印文本
  const text = 'stampdy.com' // 替换为你的水印文本
  const textWidth = ctx.measureText(text).width

  // 旋转画布并绘制多个水印
  ctx.translate(W / 2, H / 2)
  ctx.rotate(-Math.PI / 4) // 45度角旋转
  ctx.scale(pixelDensity(), pixelDensity())

  // 绘制水印网格
  for (let i = -W; i < W; i += textWidth + 60) {
    for (let j = -H; j < H; j += 120) {
      ctx.fillText(text, i, j)
    }
  }
  return canvas
}

const exportFreePNG = (download = true) => {
  const dataURL = mainCanvas.value!.toDataURL('image/png')
  download && frontDownload(dataURL, 'stamp')
  return dataURL
}

const exportPNG = (download = true) => {
  const dataURL = p5Renderer.elt.toDataURL('image/png')
  download && frontDownload(dataURL, 'stamp')
  return dataURL
}

const exportSVG = async (download = true) => {
  const svg = await canvas2svg()
  if (download) {
    frontDownload(
      URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })),
      'stamp',
    )
  }
  return svg
}

// 加载系统字体
const loadSystemFonts = async () => {
  systemFonts.value = await getSystemFonts()
}

const chooseTemplate = (template: StampTemplate) => {
  loadTemplate(template)
  templatesDialog.value = false
}

// 加载模板
const loadTemplate = (template: StampTemplate) => {
  stampConfig.primaryColor = template.primaryColor
  stampElements.value = template.elements
    .map(el => StampElement.fromJSON(JSON.stringify(el)))
    .filter(Boolean as any)
}

// 保存模板列表到本地存储
const saveTemplateToStorage = () => {
  localStorage.setItem(STORAGE_SNAPSHOT, getSnapshot())
}

// 从本地存储加载模板列表
const loadTemplateFromStorage = () => {
  const snapshot = localStorage.getItem(STORAGE_SNAPSHOT)
  if (snapshot) {
    loadTemplate(JSON.parse(snapshot))
  }
  return snapshot
}

const getSnapshot = (minify = true) =>
  JSON.stringify(
    {
      primaryColor: stampConfig.primaryColor,
      elements: stampElements.value,
    },
    null,
    minify ? 0 : 2,
  )

const exportTemplate = () => {
  const name = `seal_${Date.now()}`
  const blob = new Blob([getSnapshot(false)], { type: 'application/json' })
  frontDownload(URL.createObjectURL(blob), name)
  frontDownload(p5Renderer.elt.toDataURL('image/png'), name)
}

defineExpose({
  exportFreePNG,
  exportPNG,
  exportSVG,
  exportTemplate,
  get canvas() {
    return p5Renderer.elt
  },
})
</script>

<style scoped>
.el-icon {
  font-size: 14px;
}

.el-btn-active {
  background-color: var(--el-button-hover-bg-color);
  border-color: var(--el-button-hover-border-color);
  color: var(--el-button-hover-text-color);
  outline: none;
}

.thumbnail {
  width: 24px;
}
.thumbnail :deep(svg) {
  width: 24px;
  height: auto;
}
.thumbnail :deep([stroke]) {
  stroke: currentColor;
}
.thumbnail :deep([fill]:not([fill='none'])) {
  fill: currentColor;
}

.bg-grid-slate-100 {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ccc'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}
</style>
