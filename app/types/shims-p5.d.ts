declare global {
  namespace p5 {
    const instance: import('p5') | undefined
  }
}

declare module 'p5' {
  interface Renderer {
    drawingContext: any
  }
}

export {}
