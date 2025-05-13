export default class AsyncTask<T = void> {
  promise: Promise<T>
  done: (data: T | PromiseLike<T>) => void

  constructor() {
    this.done = () => {}
    this.promise = new Promise(resolve => (this.done = resolve))
  }
}
