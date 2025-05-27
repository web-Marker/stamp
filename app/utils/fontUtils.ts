const BASIC_FONTS = [
  'Arial',
  'Times New Roman',
  'Arial Narrow',
  'American Captain Cyrillic',
  'Courier New',
  'Days',
  'Verdana',
  'NewsGoth Lt BT',
  'Georgia',
  'Tahoma',
  'Roboto',
  'Ruslan Display',
  'Simpleiriska',
  'Marck Script',
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

// 添加一个缓存变量
let cachedSystemFonts: string[] | null = null

export async function getSystemFonts(useCache = true): Promise<string[]> {
  // 如果有缓存且允许使用缓存，直接返回
  if (useCache && cachedSystemFonts) {
    return cachedSystemFonts
  }

  try {
    // 使用 FontFace API 获取可用字体
    // @ts-ignore
    // if (window.queryLocalFonts) {
    //   // @ts-ignore
    //   const availableFonts = await window.queryLocalFonts()
    //   const fonts = [...new Set(availableFonts.map((font: any) => font.family))] as string[]
    //   // 存入缓存
    //   cachedSystemFonts = fonts
    //   console.log('🚀 ~ getSystemFonts ~ cachedSystemFonts:', cachedSystemFonts)
    //   return fonts
    // }
    // else {
    // 降级方案：返回常用字体列表
    return BASIC_FONTS
    // }
  }
  catch (error) {
    console.error('获取系统字体失败:', error)
    return BASIC_FONTS
  }
}

// 添加新函数，获取常用字体，用于快速加载
export function getBasicFonts(): string[] {
  return BASIC_FONTS
}
