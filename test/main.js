import eagleEye from '../src'

console.log('🙄')

eagleEye.init()

document.querySelector('#add').addEventListener('click', function (e) {
  for (let i = 0, len = 20; i < len; i++) {
    document.querySelector('ul').insertAdjacentHTML('beforeend', '<li></li>')
  }

  eagleEye.reRender()
})
