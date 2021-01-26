<template>
    <div 
        class="vue3-resize-drag" 
        :style="styleHandler" 
        @mousedown.stop="itemDown" 
    >
        <slot></slot>
        <div v-if="isRotate" class="rotate-icon" @mousedown.stop="itemRotate"></div>
        <!-- 组件移动辅助线 -->
        <div v-if="isGuide" v-for="i in [1,2,3,4]" :key="i" :style="moveing ? {...guideBaseStyle[i - 1],...guideStyle} : {}" class="guide">

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
import {styleIf} from '@/types/style'
import renderFn from '@/components/vue3-resize-drag/func/renderData'
import props from '@/components/vue3-resize-drag/func/props'
import watchProps from '@/components/vue3-resize-drag/func/watchProps'

import active from '@/components/vue3-resize-drag/func/active'
import itemDrag from '@/components/vue3-resize-drag/func/drag'
import itemRotateFn from '@/components/vue3-resize-drag/func/rotate'
import itemResizeFn from '@/components/vue3-resize-drag/func/resize'
export default defineComponent({
  name: 'vue3ResizeDrag',
  props,
  setup(props,{emit}){
    //   变量----------------------------------------------------------------------------------------------
    let {
        style,  // 初始化组件位置级z-index
        moveing,  // 是否移动变量 用来判断辅助线是否显示
        styleHandler,  // 计算属性处理style变量
        dragElResizeIcon,  // 缩放图标初始位置 样式
        guideBaseStyle  // 辅助线默认样式
    } = renderFn(props)  // 初始化data数据
    //   事件-----------------------------------------------------------------------------------------------
    watchProps(props,style)
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
        guideBaseStyle,
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
.guide{
    position: absolute;
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
    background: #fff;
    border:1px solid #ccc;
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