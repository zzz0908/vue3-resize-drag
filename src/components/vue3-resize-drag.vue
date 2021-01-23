<template>
    <div 
        class="vue3-resize-drag" 
        :style="styleHandler" 
        @mousedown.stop="itemDown" 
    >
        <slot></slot>
        <img v-if="isRotate" class="rotate-icon" @mousedown.stop="itemRotate" src="~@/assets/rotate.svg" alt="">
        <div
                v-if="isResizable"
                v-for="(el,index) in dragElResizeIcon"
                :key="el.class"
                class="dragElResizeIcon"
                @mousedown.stop="itemResize($event,el.class,index)" 
                :style="el.style">
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import {styleIf} from '../types/style'
export default defineComponent({
  name: 'vue3ResizeDrag',
  props:{
      x:{
          type:Number,
          default:() => {
              return 0
          }
      },
      y:{
          type:Number,
          default:() => {
              return 0
          }
      },
      zIndex:{
          type:Number,
          default:() => {
              return 0
          }
      },
      w:{
          type:Number,
          default:() => {
              return 100
          }
      },
      h:{
          type:Number,
          default:() => {
              return 100
          }
      },
      isDraggable:{
          type:Boolean,
          default:() => {
              return true
          }
      },
      isResizable:{
          type:Boolean,
          default:() => {
              return true
          }
      },
      resizeIconSize:{
          type:Number,
          default:() => {
              return 8
          }
      },
      isRotate:{
          type:Boolean,
          default:() => {
              return false
          }
      },
      rotate:{
          type:Number,
          default:() => {
              return 0
          }
      }
  },
  setup(props,{emit}){
    //   变量----------------------------------------------------------------------------------------------
    // 外层元素定位style
    const style = reactive<styleIf>({
        top:props.y,
        left:props.x,
        right:0,
        bottom:0,
        zIndex:props.zIndex,
        width:props.w,
        height:props.h,
        rotate:props.rotate
    })
    // 计算属性  计算元素位置以及宽高
    const styleHandler = computed(()=>{
        return {
            top:style.top + 'px',
            left:style.left + 'px',
            right:style.right + 'px',
            bottom:style.bottom + 'px',
            zIndex:style.zIndex,
            width:style.width + 'px',
            height:style.height + 'px',
            transform:`rotate(${style.rotate}deg)`,
        }
    })
    const dragElResizeIcon = computed(()=> {
        return [
                    {
                        class:'drag-lt',
                        style:{
                            top:-(props.resizeIconSize / 2) + 'px',
                            left:-(props.resizeIconSize / 2) + 'px',
                            width:props.resizeIconSize + 'px',
                            height:props.resizeIconSize + 'px'
                        }
                    },
                    {
                        class:'drag-ct',
                        style:{
                            top:-(props.resizeIconSize / 2) + 'px',
                            left:(<number>style.width) / 2 - (props.resizeIconSize / 2) + 'px',
                            width:props.resizeIconSize + 'px',
                            height:props.resizeIconSize + 'px'
                        }
                    },
                    {
                        class:'drag-rt',
                        style:{
                            top:-(props.resizeIconSize / 2) + 'px',
                            right:-(props.resizeIconSize / 2) + 'px',
                            width:props.resizeIconSize + 'px',
                            height:props.resizeIconSize + 'px'
                        }
                    },
                    {
                        class:'drag-rc',
                        style:{
                            top:(<number>style.height) / 2 - (props.resizeIconSize / 2) + 'px',
                            right:-(props.resizeIconSize / 2) + 'px',
                            width:props.resizeIconSize + 'px',
                            height:props.resizeIconSize + 'px'
                        }
                    },
                    {
                        class:'drag-rb',
                        style:{
                            bottom:-(props.resizeIconSize / 2) + 'px',
                            right:-(props.resizeIconSize / 2) + 'px',
                            width:props.resizeIconSize + 'px',
                            height:props.resizeIconSize + 'px'
                        }
                    },
                    {
                        class:'drag-bc',
                        style:{
                            bottom:-(props.resizeIconSize / 2) + 'px',
                            left:(<number>style.width) / 2 - (props.resizeIconSize / 2) + 'px',
                            width:props.resizeIconSize + 'px',
                            height:props.resizeIconSize + 'px'
                        }
                    },
                    {
                        class:'drag-lb',
                        style:{
                            bottom:-(props.resizeIconSize / 2) + 'px',
                            left:-(props.resizeIconSize / 2) + 'px',
                            width:props.resizeIconSize + 'px',
                            height:props.resizeIconSize + 'px'
                        }
                    },
                    {
                        class:'drag-lc',
                        style:{
                            top:(<number>style.height) / 2 - (props.resizeIconSize / 2) + 'px',
                            left:-(props.resizeIconSize / 2) + 'px',
                            width:props.resizeIconSize + 'px',
                            height:props.resizeIconSize + 'px'
                        }
                    }
                ]
    })
    //   事件-----------------------------------------------------------------------------------------------
    // 外层元素点击拖拽
    const itemDown = (ev: any): void => {
        let target = ev.target || ev.srcElement
        ev.stopPropagation()
        ev.preventDefault()
        //算出鼠标相对元素的位置
        let disX = ev.clientX - target.offsetLeft
        let disY = ev.clientY - target.offsetTop
        emit('downHandler',{  // 点击元素事件回调
            el:target,
            e:ev
        })
        if(!props.isDraggable) return
        //鼠标按下并移动的事件
        document.onmousemove = (e)=>{
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX  
            let top = e.clientY - disY
            console.log(left,top,'ssss')
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
        document.onmouseup = (e) => {
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
    // 元素缩放
    const itemResize = (ev: any,cls: string,index: number) => {
        let target = ev.target.offsetParent || ev.srcElement.parentNode
        ev.stopPropagation()
        ev.preventDefault()
        let w = 0
        let h = 0
        let top = 0
        let left = 0
        // 鼠标拖拽改变元素大小
        document.onmousemove = (e)=>{
            console.log(target.offsetHeight,target.offsetTop,e.clientY)
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
            emit('resizeHandler',{
                el:target,
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
        document.onmouseup = (e) => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
    // 元素旋转
    const itemRotate = (ev: any) => {
        let target = ev.target.offsetParent || ev.srcElement.parentNode
        ev.stopPropagation()
        ev.preventDefault()
        let cx = target.offsetWidth / 2
        let cy = target.offsetHeight / 2
        let offsetX = target.offsetLeft
        let offsetY = target.offsetTop
        document.onmousemove = (e) => {
			let mouseX = e.pageX - offsetX;//计算出鼠标相对于画布顶点的位置,无pageX时用clientY + body.scrollTop - body.clientTop代替,可视区域y+body滚动条所走的距离-body的border-top,不用offsetX等属性的原因在于，鼠标会移出画布
			let mouseY = e.pageY - offsetY;
			let ox = mouseX - cx;//cx,cy为圆心
			let oy = mouseY - cy;
			let to = Math.abs( ox / oy );
			let angle = Math.atan( to )/( 2 * Math.PI ) * 360;//鼠标相对于旋转中心的角度
			if( ox < 0 && oy < 0)//相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系
			{
				angle = -angle;
			}else if( ox < 0 && oy > 0)//左下角,3象限
			{
				angle = -( 180 - angle )
			}else if( ox > 0 && oy < 0)//右上角，1象限
			{
				angle = angle;
			}else if( ox > 0 && oy > 0)//右下角，2象限
			{
				angle = 180 - angle;
			}
            style.rotate = angle
            emit('rotateHandler',{
                el:target,
                e,
                rotate:angle
            })
        }
        document.onmouseup = (e) => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
    return {
        style,
        dragElResizeIcon,
        styleHandler,
        itemDown,
        itemResize,
        itemRotate
    }
  }
});
</script>

<style scoped>
.vue3-resize-drag {
    position: absolute;
    box-sizing: border-box;
    border: 1px dashed #ccc;
    transition: width height 1s;
    transform-origin:center center;
}
/* 旋转图标 */
.rotate-icon{
    width: 16px;
    position: absolute;
    top: -20px;
    left: calc(50% - 8px)
}
/* 缩放角标 */
.dragElResizeIcon{
    position: absolute;
    background: #f00;
}
</style>