import { watch } from 'vue'
// 外层元素点击拖拽
const watchProps = (props: any, style: any): void => {
  watch(() => {
    return props.x
  },
    (n) => {
      style.left = n
    })
  watch(() => {
    return props.y
  },
    (n) => {
      style.top = n
    })
  watch(() => {
    return props.zIndex
  },
    (n) => {
      style.zIndex = n
    })
  watch(() => {
    return props.w
  },
    (n) => {
      style.width = n
    })
  watch(() => {
    return props.h
  },
    (n) => {
      style.height = n
    })
  watch(() => {
    return props.rotate
  },
    (n) => {
      style.rotate = n
    })
}
export default watchProps