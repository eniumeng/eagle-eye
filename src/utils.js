export function debounce (fn, delay) {
  let timer // 维护一个 timer

  return function () {
    const _this = this // 取debounce执行作用域的this
    const args = arguments

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(function () {
      fn.apply(_this, args) // 用apply指向调用debounce的对象，相当于_this.fn(args);
    }, delay)
  }
}

export function throttle (fn, delay) {
  let timer

  return function () {
    const _this = this
    const args = arguments
    if (timer) {
      return
    }
    timer = setTimeout(function () {
      fn.apply(_this, args)
      timer = null // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
    }, delay)
  }
}
