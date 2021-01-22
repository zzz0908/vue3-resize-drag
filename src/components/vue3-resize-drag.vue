<template>
    <div 
        class="vue3-resize-drag" 
        :style="styleHandler" 
        @mousedown.stop="itemDown" 
    >
        <slot></slot>
        <div
                v-for="el in dragElResizeIcon"
                :key="el.class"
                class="dragElResizeIcon"
                @mousedown.stop="itemResize($event,el.class)" 
                :style="el.style">
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import {styleIf} from '../types/style'
export default defineComponent({
  name: 'vue3-resize-drag',
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
        height:props.h
    })
    // 元素角标 用于缩放
    const dragElResizeIcon = reactive([
        {
            class:'drag-lt',
            style:{
                top:0,
                left:0
            }
        },
        {
            class:'drag-ct',
            style:{
                top:0,
                left:(<number>style.width) / 2 + 'px'
            }
        },
        {
            class:'drag-rt',
            style:{
                top:0,
                right:0
            }
        },
        {
            class:'drag-rc',
            style:{
                top:(<number>style.height) / 2 + 'px',
                right:0
            }
        },
        {
            class:'drag-rb',
            style:{
                bottom:0,
                right:0
            }
        },
        {
            class:'drag-bc',
            style:{
                bottom:0,
                left:(<number>style.width) / 2 + 'px'
            }
        },
        {
            class:'drag-lb',
            style:{
                bottom:0,
                left:0
            }
        },
        {
            class:'drag-lc',
            style:{
                top:(<number>style.height) / 2 + 'px',
                left:0
            }
        }
    ])
    // 计算属性
    const styleHandler = computed(()=>{
        return {
            top:style.top + 'px',
            left:style.left + 'px',
            right:style.right + 'px',
            bottom:style.bottom + 'px',
            zIndex:style.zIndex,
            width:style.width + 'px',
            height:style.height + 'px'
        }
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
    const itemResize = (ev: any,cls: string) => {
        console.log(ev,cls,'clsclscls')
        let target = ev.target.offsetParent || ev.srcElement
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
                case 'drag-ct':
                    h = target.offsetHeight + target.offsetTop - e.clientY
                    w = target.offsetWidth
                    top = e.clientY
                    left = target.offsetLeft
                    break;
            
                default:
                    w = target.offsetWidth
                    h = target.offsetHeight
                    top = target.offsetTop
                    left = target.offsetLeft
                    break;
            }
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
    return {
        style,
        dragElResizeIcon,
        styleHandler,
        itemDown,
        itemResize
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
}
/* 缩放角标 */
.dragElResizeIcon{
    position: absolute;
    width: 4px;
    height: 4px;
    background: #f00;
}
</style>