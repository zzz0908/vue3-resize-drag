<template>
    <vue3ResizeDrag 
    v-for="(item,index) in data" 
    :key="item.name" 
    :x="item.x" 
    :y="item.y" 
    :zIndex="1"
    @mousedown="activeMouseDown(item,index)"
    @moveHandler="moveHandler"
    @mouseUpHandler="mouseUpHandler"
    @downHandler="downHandler"
    :isDraggable="item.drag"
    :isResizable="item.resize"
    :isRotate="item.rotate"
    :isActive="item.active"
    @resizeHandler="resizeHandler"
    @rotateHandler="rotateHandler"
    :resizeIconSize="8"
    :isGuide="true"
    :guideStyle="{}"
    @activated="activated"
    @deactivated="deactivated"
    >
        {{item.name}}
    </vue3ResizeDrag>
</template>

<script lang="ts">
import { defineComponent ,reactive,ref} from 'vue';
// import vue3ResizeDrag from '@/components/vue3-resize-drag.vue'
export default defineComponent({
  name: 'entry',
  components:{
    //   vue3ResizeDrag
  },
  setup() {
      const data = reactive([
          {
              x:100,
              y:100,
              name:'哈哈',
              drag:false,
              resize:true,
              rotate:true,
              active:false
          },
          {
              x:200,
              y:200,
              name:'哈哈2',
              drag:true,
              resize:true,
              rotate:true,
              active:true
          },
          {
              x:300,
              y:300,
              name:'哈哈3',
              drag:true,
              resize:true,
              rotate:true,
              active:false
          },
          {
              x:400,
              y:400,
              name:'哈哈4',
              drag:true,
              resize:true,
              rotate:true,
              active:false
          },
          {
              x:500,
              y:500,
              name:'哈哈5',
              drag:true,
              resize:true,
              rotate:true,
              active:false
          },
          {
              x:600,
              y:600,
              name:'哈哈6',
              drag:true,
              resize:false,
              rotate:false,
              active:false
          }
      ])
      const moveHandler = (data:object) => {
          console.log(data,'移动')
      }
      const downHandler = (data:object) => {
          console.log(data,'按下')
      }
      const mouseUpHandler = (data:object) => {
          console.log(data,'抬起')
      }
      const resizeHandler = (data: object) => {
          console.log(data,'缩放')
      }
      const rotateHandler = (data: object) => {
          console.log(data,'旋转')
      }
      const activated = (data: object) => {
          console.log(data,'激活')
      }
      const deactivated = (data: object) => {
          console.log(data,'取消激活')
      }
      let currentIndex = ref(-1)  // 临时存储当前激活组件的index
      //   自制激活事件 点击组件激活
      const activeMouseDown = (item:any,index: number) => {
          if(currentIndex.value === index) return
          data.forEach((item,i) => {
              if(i === index){
                item['active'] = true
              }else{
                item['active'] = false
              }
          })
          currentIndex.value = index
      }
      return {
          data,
          moveHandler,
          downHandler,
          mouseUpHandler,
          resizeHandler,
          rotateHandler,
          deactivated,
          activated,
          activeMouseDown
      }
  }
});
</script>