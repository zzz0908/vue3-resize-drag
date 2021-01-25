import { ref, reactive } from 'vue'
import {styleIf} from '@/types/style'
// 外层元素点击拖拽
const itemDrag = (ev: any, emit: Function, props: any,style: any,moveing: any): void => {
  let target:any = ev.target || ev.srcElement
  ev.stopPropagation()
  ev.preventDefault()
  //算出鼠标相对元素的位置
  let disX:number = ev.clientX - target.offsetLeft
  let disY:number = ev.clientY - target.offsetTop
  emit('downHandler',{  // 点击元素事件回调
      el:target,
      e:ev
  })
  if(!props.isDraggable) return
  //鼠标按下并移动的事件
  document.onmousemove = (e:any)=>{
      moveing.value = true
      //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let left:number = e.clientX - disX  
      let top:number = e.clientY - disY
      //绑定元素位置到positionX和positionY上面
      
      //移动当前元素
      style.top = top 
      style.left = left 
      emit('moveHandler',{  // 移动事件回调
          el:target,
          e,
          top,
          left
      })
  }
  document.onmouseup = (e:any) => {
      moveing.value = false
      emit('mouseUpHandler',{  // 抬起事件回调
          el:target,
          e,
          top:style.top,
          left:style.left
      })
      document.onmousemove = null
      document.onmouseup = null
  }
}
export default itemDrag