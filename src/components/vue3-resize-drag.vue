<template>
    <div class="vue3-resize-drag" :style="styleHandler" @mousedown="itemDown">
        <slot></slot>
        <!-- <div
                v-for="stick in sticks"
                :key="stick"
                class="vdr-stick"
                :class="['vdr-stick-' + stick, isResizable ? '' : 'not-resizable']"
                @mousedown.stop.prevent="stickDown(stick, $event)"
                @touchstart.stop.prevent="stickDown(stick, $event)"
                :style="vdrStick(stick)">
        </div> -->
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
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
      }
  },
  setup(props){
    //   变量----------------------------------------------------------------------------------------------
    // 外层元素定位style
    const style = reactive<styleIf>({
        top:props.y || 0,
        left:props.x || 0,
        right:0,
        bottom:0,
        zIndex:props.zIndex || 0
    })
    // 计算属性
    const styleHandler = computed(()=>{
        return {
            top:style.top + 'px',
            left:style.left + 'px',
            right:style.right + 'px',
            bottom:style.bottom + 'px',
            zIndex:style.zIndex
        }
    })
    //   事件-----------------------------------------------------------------------------------------------
    // 外层元素点击滑动
    const itemDown = (ev: Event) => {
        console.log(ev)
        let target = ev.target || ev.srcElement
        ev.stopPropagation()
        ev.preventDefault()
        style.left = typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX
        style.top = typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY
        // this.stickStartPos.mouseX = typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX
        // this.stickStartPos.mouseY = typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY

        // this.stickStartPos.left = this.left
        // this.stickStartPos.right = this.right
        // this.stickStartPos.top = this.top
        // this.stickStartPos.bottom = this.bottom
    }
    return {
        style,
        styleHandler,
        itemDown,
    }
  }
});
</script>

<style scoped>
.vue3-resize-drag {
    position: absolute;
    box-sizing: border-box;
}
</style>