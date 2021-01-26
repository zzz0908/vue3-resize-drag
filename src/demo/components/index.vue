<template>
    <vue3ResizeDrag 
    v-for="(item,index) in data.data" 
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
      let data = reactive({
          data:[
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
        ]
      })
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
          data.data.forEach((item,i) => {
              if(i === index){
                item['active'] = true
              }else{
                item['active'] = false
              }
          })
          currentIndex.value = index
      }
      let copyData = reactive({
          copy:{}
      })
      document.onkeydown = function(e:any){  // 绑定键盘事件
        e = e || window.event;  //标准化事件处理
        if (e.keyCode == 46) {  // delete  按键盘delete删除
            data.data = data.data.filter((item,index) => index != currentIndex.value)
        } else if (e.ctrlKey && e.keyCode == 67) {  // Ctrl + C  // 复制
            if(currentIndex.value >= 0){
                copyData.copy = Object.assign({},data.data[currentIndex.value])
            }
        } else if (e.ctrlKey && e.keyCode == 86) {   // Ctrl + V  // 粘贴
            let copy: object = Object.assign({},copyData.copy)
            let copyReactive = reactive({
                copy
            })
            console.log(copyReactive.copy)
            // data.data.push(copyReactive.copy)
        } else if (e.ctrlKey && e.keyCode == 90) {  // Ctrl + Z  // 撤回
            //   暂时没写
        } else if (e.ctrlKey) {
            //   暂时没写
        }else if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){  // 键盘上下左右移动激活中的组件
              //      左                  上                  右                下
              if(currentIndex.value >= 0){
                switch (e.keyCode) {
                    case 37:
                        data.data[currentIndex.value].x -= 1
                        break;
                      case 38:
                          data.data[currentIndex.value].y --
                          break;
                      case 39:
                          data.data[currentIndex.value].x ++
                          break;
                      case 40:
                          data.data[currentIndex.value].y ++
                          break;
                }
              }
        }
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