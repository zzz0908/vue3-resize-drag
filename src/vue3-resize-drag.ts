import vue3ResizeDrag from '@/components/vue3-resize-drag.vue'
const vue3ResizeDragObj = {  //  定义一个对象
    install (Vue:any) {  // 需要拥有一个 install 方法
        Vue.component(vue3ResizeDrag.name, vue3ResizeDrag)  // vuePayKeyboard.name 组件的name属性
        // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
        // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
        // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
        // 新增
        // if (typeof window !== 'undefined' && Vue) {
        //     Vue.use(vue3ResizeDrag);
        // }
    }
}
// 导出这个对象
export default vue3ResizeDragObj