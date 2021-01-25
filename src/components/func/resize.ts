

// 元素缩放
const itemResize = (ev: any, cls: string, index: number,emit:Function,style:any) => {
  let target:any = ev.target.offsetParent || ev.srcElement.parentNode
  ev.stopPropagation()
  ev.preventDefault()
  let w:number = 0
  let h:number = 0
  let top:number = 0
  let left:number = 0
  // 鼠标拖拽改变元素大小
  document.onmousemove = (e) => {
    switch (cls) {
      case 'drag-ct':  // top center
        h = target.offsetHeight + target.offsetTop - e.clientY
        w = target.offsetWidth
        top = e.clientY
        left = target.offsetLeft
        break;
      case 'drag-lc':  // left center
        h = target.offsetHeight
        w = target.offsetWidth + target.offsetLeft - e.clientX
        top = target.offsetTop
        left = e.clientX
        break;
      case 'drag-bc':  // bottom center
        h = e.clientY - target.offsetTop
        w = target.offsetWidth
        top = target.offsetTop
        left = target.offsetLeft
        break;
      case 'drag-rc':  // right center
        h = target.offsetHeight
        w = e.clientX - target.offsetLeft
        top = target.offsetTop
        left = target.offsetLeft
        break;
      case 'drag-lt':  // left top
        h = target.offsetHeight + target.offsetTop - e.clientY
        w = target.offsetWidth + target.offsetLeft - e.clientX
        top = e.clientY
        left = e.clientX
        break;
      case 'drag-rt':  // right top
        h = target.offsetHeight + target.offsetTop - e.clientY
        w = e.clientX - target.offsetLeft
        top = e.clientY
        left = target.offsetLeft
        break;
      case 'drag-rb':  // right bottom
        h = e.clientY - target.offsetTop
        w = e.clientX - target.offsetLeft
        top = target.offsetTop
        left = target.offsetLeft
        break;
      case 'drag-lb':  // left bottom
        h = e.clientY - target.offsetTop
        w = target.offsetWidth + target.offsetLeft - e.clientX
        top = target.offsetTop
        left = e.clientX
        break;

      default:
        w = target.offsetWidth
        h = target.offsetHeight
        top = target.offsetTop
        left = target.offsetLeft
        break;
    }
    emit('resizeHandler', {
      el: target,
      e,
      w,
      h,
      top,
      left
    })
    style.width = w
    style.height = h
    style.top = top
    style.left = left
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
}
export default itemResize