const BASIC_FONTS = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Georgia',
  'Tahoma',
  'Trebuchet MS',
  'Impact',
  'Comic Sans MS',
  'Palatino',
  'Garamond',
  'Book Antiqua',
  'Lucida Sans Unicode',
  'Lucida Console',
  'MS Sans Serif',
  'MS Serif',
  'Symbol',
  'Cambria',
  'Calibri',
  'Candara',
  'Consolas',
  'Constantia',
  'Corbel',
].sort()

export async function getSystemFonts(): Promise<string[]> {
  try {
    // 使用 FontFace API 获取可用字体
    // @ts-ignore
    if (window.queryLocalFonts) {
      // @ts-ignore
      const availableFonts = await window.queryLocalFonts()
      return [
        ...new Set(availableFonts.map((font: any) => font.family)),
      ] as string[]
    } else {
      // 降级方案：返回常用中文字体列表
      return BASIC_FONTS
    }
  } catch (error) {
    console.error('获取系统字体失败:', error)
    return BASIC_FONTS
  }
}
