<template>
    <div 
        class="vue3-resize-drag" 
        :style="styleHandler" 
        @mousedown.stop="itemDown" 
    >
        <slot></slot>
        <div v-if="isRotate" class="rotate-icon" @mousedown.stop="itemRotate"></div>
        <!-- 组件移动辅助线 -->
        <div v-if="isGuide" v-for="i in [1,2,3,4]" :key="i" :style="guideStyle" :class="moveing ? `guide${i}` : ''">

        </div>
        <!-- 组件四周缩放按钮 -->
        <div
                v-if="isResizable && isActive"
                v-for="(el,index) in dragElResizeIcon"
                :key="el.class"
                class="dragElResizeIcon"
                :class="el.class"
                @mousedown.stop="itemResize($event,el.class,index)" 
                :style="el.style">
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import {styleIf} from '../types/style'
import renderFn from '@/components/func/renderData'
import props from '@/components/func/props'

import active from '@/components/func/active'
import itemDrag from '@/components/func/drag'
import itemRotateFn from '@/components/func/rotate'
import itemResizeFn from '@/components/func/resize'
export default defineComponent({
  name: 'vue3ResizeDrag',
  props,
  setup(props,{emit}){
    //   变量----------------------------------------------------------------------------------------------
    let {
        style,  // 初始化组件位置级z-index
        moveing,  // 是否移动变量 用来判断辅助线是否显示
        styleHandler,  // 计算属性处理style变量
        dragElResizeIcon  // 缩放图标初始位置 样式
    } = renderFn(props)  // 初始化data数据
    //   事件-----------------------------------------------------------------------------------------------
    const itemResize = (ev: any, cls: string, index: number) => {  // 缩放
        itemResizeFn(ev, cls, index,emit,style)
    }
    const itemRotate = (ev:any) => {  // 旋转
        itemRotateFn(ev,emit, style)
    }
    const itemDown = (ev: any) => {  // 拖拽
        itemDrag(ev,emit, props,style,moveing)
    }
    active(props,emit)  // 监听激活
    return {
        style,
        dragElResizeIcon,
        styleHandler,
        itemDown,
        itemResize,
        itemRotate,
        moveing
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
/* 辅助线 */
.guide1{
    position: absolute;
    top: 0;
    border-top: 1px solid #fcc;
    width: 100vw;
    left: -50vw;
}
.guide2{
    position: absolute;
    left: 0;
    border-left: 1px solid #fcc;
    height: 100vh;
    top:-50vh;
}
.guide3{
    position: absolute;
    right: 0;
    border-right: 1px solid #fcc;
    height: 100vh;
    top:-50vh;
}
.guide4{
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid #fcc;
    width: 100vw;
    left:-50vw;
}
/* 旋转图标 */
.rotate-icon{
    width: 16px;
    height: 16px;
    position: absolute;
    top: -20px;
    left: calc(50% - 8px);
    background:url('~@/assets/rotate.png') no-repeat;
    background-size: 100%;
}
/* 缩放角标 */
.dragElResizeIcon{
    position: absolute;
    background: #f00;
}
.drag-ct{
    cursor: s-resize;
}
.drag-lt{
    cursor: se-resize;
}
.drag-rt{
    cursor: ne-resize;
}
.drag-rc{
    cursor: w-resize;
}
.drag-rb{
    cursor: se-resize;
}
.drag-bc{
    cursor: s-resize;
}
.drag-lb{
    cursor: ne-resize;
}
.drag-lc{
    cursor: w-resize;
}
</style>