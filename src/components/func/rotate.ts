
// 元素旋转
const itemRotate = (ev: any,emit: Function,style:any) => {
  let target:any = ev.target.offsetParent || ev.srcElement.parentNode
  ev.stopPropagation()
  ev.preventDefault()
  let cx:number = target.offsetWidth / 2
  let cy:number = target.offsetHeight / 2
  let offsetX:number = target.offsetLeft
  let offsetY:number = target.offsetTop
  document.onmousemove = (e:any) => {
    let mouseX:number = e.pageX - offsetX;//计算出鼠标相对于画布顶点的位置,无pageX时用clientY + body.scrollTop - body.clientTop代替,可视区域y+body滚动条所走的距离-body的border-top,不用offsetX等属性的原因在于，鼠标会移出画布
    let mouseY:number = e.pageY - offsetY;
    let ox:number = mouseX - cx;//cx,cy为圆心
    let oy:number = mouseY - cy;
    let to:number = Math.abs(ox / oy);
    let angle:number = Math.atan(to) / (2 * Math.PI) * 360;//鼠标相对于旋转中心的角度
    if (ox < 0 && oy < 0)//相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系
    {
      angle = -angle;
    } else if (ox < 0 && oy > 0)//左下角,3象限
    {
      angle = -(180 - angle)
    } else if (ox > 0 && oy < 0)//右上角，1象限
    {
      angle = angle;
    } else if (ox > 0 && oy > 0)//右下角，2象限
    {
      angle = 180 - angle;
    }
    style.rotate = angle
    emit('rotateHandler', {
      el: target,
      e,
      rotate: angle
    })
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
}

export default itemRotate