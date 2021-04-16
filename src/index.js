import html2canvas from 'html2canvas'
import { debounce, throttle } from './utils'
import './index.scss'

let pageWidth = 0
let pageHeight = 0
let clientWidth = 0
let clientHeight = 0

let eagleEyeEle = null
let tempCanvasCtnEle = null
let folderEle = null
let scopeCtnEle = null
let scopePositionMarkingEle = null
let scopeCtnEleWidth = 0
let scopeCtnEleHeight = 0
let scopePositionMarkingEleWidth = 0
let scopePositionMarkingEleHeight = 0

function renderAssemblyUnit() {
  document.body.insertAdjacentHTML('beforeEnd', `
    <div id="eagle-eye" class="eagle-eye-ctn" data-html2canvas-ignore>
      <div id="folder" class="folder">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L3.35355 2.64645ZM9 9.5C9.27614 9.5 9.5 9.27614 9.5 9L9.5 4.5C9.5 4.22386 9.27614 4 9 4C8.72386 4 8.5 4.22386 8.5 4.5L8.5 8.5L4.5 8.5C4.22386 8.5 4 8.72386 4 9C4 9.27614 4.22386 9.5 4.5 9.5L9 9.5ZM2.64645 3.35355L8.64645 9.35355L9.35355 8.64645L3.35355 2.64645L2.64645 3.35355Z" fill="white"/>
        </svg>
      </div>

      <div class="unfolder"></div>

      <div id="scope-ctn" class="scope-ctn">
        <div id="scope-position-marking" class="scope-position-marking"></div>
        <div id="scope-selector" class="scope-selector"></div>
      </div>
      <div id="temp-canvas-ctn" data-html2canvas-ignore></div>
    </div>
  `)
}

function setEnvParams () {
  pageWidth = document.body.scrollWidth
  pageHeight = document.body.scrollHeight
  clientWidth = window.innerWidth
  clientHeight = window.innerHeight
}

function getElements () {
  eagleEyeEle = document.body.querySelector('#eagle-eye')
  tempCanvasCtnEle = document.body.querySelector('#temp-canvas-ctn')
  folderEle = document.body.querySelector('#folder')
  scopeCtnEle = document.body.querySelector('#scope-ctn')
  scopePositionMarkingEle = document.body.querySelector('#scope-position-marking')
}

function setSelector () {
  if ((pageWidth / pageHeight) > (216 / 128)) {
    scopeCtnEleWidth = 216
    scopeCtnEleHeight = pageHeight * 216 / pageWidth

    scopeCtnEle.style.width = scopeCtnEleWidth + 'px'
    scopeCtnEle.style.height = scopeCtnEleHeight + 'px'
  } else {
    scopeCtnEleHeight = 128
    scopeCtnEleWidth = pageWidth * 128 / pageHeight

    scopeCtnEle.style.height = scopeCtnEleHeight + 'px'
    scopeCtnEle.style.width = scopeCtnEleWidth + 'px'
  }

  scopePositionMarkingEleWidth = clientWidth * scopeCtnEleWidth / pageWidth
  scopePositionMarkingEleHeight = clientHeight * scopeCtnEleHeight / pageHeight

  scopePositionMarkingEle.style.height = scopePositionMarkingEleHeight + 'px'
  scopePositionMarkingEle.style.width = scopePositionMarkingEleWidth + 'px'
}

function renderThumbnail () {
  html2canvas(document.body, {
    width: pageWidth,
    height: pageHeight
  }).then(canvas => {
    tempCanvasCtnEle.appendChild(canvas)

    const imgSrc = canvas.toDataURL("image/jpeg")

    const img = new Image()

    img.src = imgSrc

    const existImg = eagleEyeEle.querySelector('img')

    if (existImg) {
      eagleEyeEle.removeChild(existImg)
    }

    eagleEyeEle.appendChild(img)
  })
}

function bindWindowResizeEvent () {
  window.addEventListener('resize', debounce(reRender, 500))
}

function bindFolderEvent () {
  eagleEyeEle.addEventListener('click', function () {
    if (this.classList.contains('minimal')) {
      this.classList.remove('minimal')

      scopeCtnEle.style.display = 'block'
    }
  })

  folderEle.addEventListener('click', function (e) {
    e.stopPropagation()

    eagleEyeEle.classList.add('minimal')

    scopeCtnEle.style.display = 'none'
  })
}

function positeScopeSelector () {
  const pageScrollTop = window.scrollY
  const pageScrollLeft = window.scrollX

  scopePositionMarkingEle.style.top = (scopeCtnEleHeight - scopePositionMarkingEleHeight) * pageScrollTop / (pageHeight - clientHeight) + 'px'
  scopePositionMarkingEle.style.left = (scopeCtnEleWidth - scopePositionMarkingEleWidth) * pageScrollLeft / (pageWidth - clientWidth) + 'px'
}

function bindPageScrollEvent () {
  window.addEventListener('scroll', positeScopeSelector)
}

function bindRepositePageEvent () {
  function doReposite (e) {
    e.stopPropagation()

    const scrollTop = (pageHeight - clientHeight) * e.offsetY / (scopeCtnEleHeight - scopePositionMarkingEleHeight)
    const scrollLeft = (pageWidth - clientWidth) * e.offsetX / (scopeCtnEleWidth - scopePositionMarkingEleWidth)

    // console.log(e.offsetX, e.offsetY, scrollLeft, scrollTop, e)

    if (e.offsetX < 1) {
      return
    }

    window.scrollTo(scrollLeft, scrollTop)
  }

  scopeCtnEle.addEventListener('mousedown', e => {
    doReposite(e)

    scopeCtnEle.addEventListener('mousemove', doReposite)
  })

  scopeCtnEle.addEventListener('mouseup', e => {
    scopeCtnEle.removeEventListener('mousemove', doReposite)
  })

  scopeCtnEle.addEventListener('mouseenter', e => {
    scopeCtnEle.removeEventListener('mousemove', doReposite)
  })
}

export function init ({
  show=(pageWidth >= 2 * clientWidth || pageHeight >= 2 * clientHeight)
} = {}) {
  console.log(show)

  if (!show) {
    return
  }

  setEnvParams()
  renderAssemblyUnit()
  getElements()
  setSelector()
  renderThumbnail()
  bindFolderEvent()
  positeScopeSelector()
  bindPageScrollEvent()
  bindRepositePageEvent()
  bindWindowResizeEvent()
}

export function reRender () {
  setEnvParams()
  setSelector()
  renderThumbnail()
}

export default {
  init,
  reRender
}
