# vue3-resize-drag
# 文档

## 组件用法
```
<vue3ResizeDrag 
    v-for="item in data" 
    :key="item.name" 
    :x="item.x"   // x 为组件left位置
    :y="item.y"   // y 为组件top位置
    :w="100"  // 组件宽度 默认为100
    :h="100"  // 组件高度 默认为100
    :zIndex="1"  // 组件层级大小
    @moveHandler="moveHandler"  // 组件移动回调
    @mouseUpHandler="mouseUpHandler"  // 组件移动结束回调
    @downHandler="downHandler"  // 移动开始之前回调
    :isDraggable="item.drag"  // 是否可移动 默认为true
    :isResizable="item.resize"  // 是否可缩放 默认为true
    :isRotate="item.rotate"   // 是否可旋转  默认为false
    :rotate="0"  // 旋转角度 默认为0
    @resizeHandler="resizeHandler"  // 缩放回调函数
    @rotateHandler="rotateHandler"  // 旋转回调函数
    :resizeIconSize="8"  // 缩放按钮大小 默认为8px
    >
        {{item.name}}
    </vue3ResizeDrag>

    const data = reactive([
          {
              x:100,
              y:100,
              name:'哈哈',
              drag:false,
              resize:true,
              rotate:true
          }
    ])
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
