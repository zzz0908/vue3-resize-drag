# vue3-resize-drag
# 文档
### vue3.0拖拽缩放插件
## 下载并引入
```
npm i vue3-resize-drag -S
yarn add vue3-resize-drag -S

import vue3ResizeDrag from 'vue3-resize-drag'
const app = createApp(App)
app.use(vue3ResizeDrag)

注意:
如果vue3.0中使用ts了,那么请在src/shims-vue.d.ts声明文件中加入此插件声明:
declare module 'vue3-resize-drag'
加入之后重启项目~~
```
## 组件用法
```
<template>
    <vue3ResizeDrag 
        v-for="item in data.data" 
        :key="item.name" 
        :x="item.x"   <!-- x 为组件left位置 -->
        :y="item.y"   <!-- y 为组件top位置 -->
        :w="100"  <!-- 组件宽度 默认为100 -->
        :h="100"  <!-- 组件高度 默认为100 -->
        :zIndex="1"  <!-- 组件层级大小 -->
        @moveHandler="moveHandler"  <!-- 组件移动回调 -->
        @mouseUpHandler="mouseUpHandler"  <!-- 组件移动结束回调 -->
        @downHandler="downHandler"  <!-- 移动开始之前回调 -->
        :isDraggable="item.drag"  <!-- 是否可移动 默认为true -->
        :isResizable="item.resize"  <!-- 是否可缩放 默认为true -->
        :isRotate="item.rotate"   <!-- 是否可旋转  默认为false -->
        :isActive="item.active"  <!-- 是否激活 默认为false -->
        :rotate="0"  <!-- 旋转角度 默认为0 -->
        @resizeHandler="resizeHandler"  <!-- 缩放回调函数 -->
        @rotateHandler="rotateHandler"  <!-- 旋转回调函数 -->
        :resizeIconSize="8"  <!-- 缩放按钮大小 默认为8px -->
        :isGuide="true"   <!-- 是否开启辅助线 默认为false -->
        :guideStyle="{}"  <!-- 辅助线样式 -->
        @activated="activated"  <!-- 激活回调函数 -->
        @deactivated="deactivated"  <!-- 取消激活回调函数 -->
        @mousedown="activeMouseDown(item,index)"   <!-- 激活点击 -->
        >
        {{item.name}}
    </vue3ResizeDrag>
</template>
<script lang="ts">
import { defineComponent ,reactive,ref} from 'vue';
export default defineComponent({
  name: 'entry',
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
          console.log(data)
          data.data.forEach((item,i) => {
              if(i === index){
                item['active'] = true
              }else{
                item['active'] = false
              }
          })
          currentIndex.value = index
      }
    //   保存复制的数据
      let copyData = reactive<any>({
          allData:[],
          copy:{}
      })
      document.onkeydown = function(e:any){  // 绑定键盘事件
        e = e || window.event;  //标准化事件处理
        if (e.keyCode == 46) {  // delete  按键盘delete删除
            data.data = data.data.filter((item,index) => index != currentIndex.value)
        } else if (e.ctrlKey && e.keyCode == 67) {  // Ctrl + C  // 复制
            if(currentIndex.value >= 0){
                copyData.allData = [...data.data]
                copyData.copy = JSON.parse(JSON.stringify(copyData.allData[currentIndex.value]))
            }
        } else if (e.ctrlKey && e.keyCode == 86) {   // Ctrl + V  // 粘贴
            copyData.allData.push(copyData.copy)
            data.data = copyData.allData
        } else if (e.ctrlKey && e.keyCode == 90) {  // Ctrl + Z  // 撤回
            //   暂时没写
        } else if (e.ctrlKey) {
            //   暂时没写
        }else if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){  // 键盘上下左右移动激活中的组件
              //      左                  上                  右                下
              if(currentIndex.value >= 0){
                switch (e.keyCode) {
                    case 37:
                          data.data[currentIndex.value].x --
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
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
