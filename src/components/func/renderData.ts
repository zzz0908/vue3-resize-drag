import { computed, reactive, ref } from 'vue';
import {styleIf} from '@/types/style'
function render(props: any) {
     // 外层元素定位style
     const style = reactive<styleIf>({
        top:props.y,
        left:props.x,
        right:0,
        bottom:0,
        zIndex:props.zIndex,
        width:props.w,
        height:props.h,
        rotate:props.rotate
    })
    const moveing = ref(false)
    // 计算属性  计算元素位置以及宽高
    const styleHandler = computed(()=>{
        return {
            top:style.top + 'px',
            left:style.left + 'px',
            right:style.right + 'px',
            bottom:style.bottom + 'px',
            zIndex:style.zIndex,
            width:style.width + 'px',
            height:style.height + 'px',
            transform:`rotate(${style.rotate}deg)`,
        }
    })
    const dragElResizeIcon = computed(()=> {
        return [
                {
                    class:'drag-lt',
                    style:{
                        top:-(props.resizeIconSize / 2) + 'px',
                        left:-(props.resizeIconSize / 2) + 'px',
                        width:props.resizeIconSize + 'px',
                        height:props.resizeIconSize + 'px'
                    }
                },
                {
                    class:'drag-ct',
                    style:{
                        top:-(props.resizeIconSize / 2) + 'px',
                        left:(<number>style.width) / 2 - (props.resizeIconSize / 2) + 'px',
                        width:props.resizeIconSize + 'px',
                        height:props.resizeIconSize + 'px'
                    }
                },
                {
                    class:'drag-rt',
                    style:{
                        top:-(props.resizeIconSize / 2) + 'px',
                        right:-(props.resizeIconSize / 2) + 'px',
                        width:props.resizeIconSize + 'px',
                        height:props.resizeIconSize + 'px'
                    }
                },
                {
                    class:'drag-rc',
                    style:{
                        top:(<number>style.height) / 2 - (props.resizeIconSize / 2) + 'px',
                        right:-(props.resizeIconSize / 2) + 'px',
                        width:props.resizeIconSize + 'px',
                        height:props.resizeIconSize + 'px'
                    }
                },
                {
                    class:'drag-rb',
                    style:{
                        bottom:-(props.resizeIconSize / 2) + 'px',
                        right:-(props.resizeIconSize / 2) + 'px',
                        width:props.resizeIconSize + 'px',
                        height:props.resizeIconSize + 'px'
                    }
                },
                {
                    class:'drag-bc',
                    style:{
                        bottom:-(props.resizeIconSize / 2) + 'px',
                        left:(<number>style.width) / 2 - (props.resizeIconSize / 2) + 'px',
                        width:props.resizeIconSize + 'px',
                        height:props.resizeIconSize + 'px'
                    }
                },
                {
                    class:'drag-lb',
                    style:{
                        bottom:-(props.resizeIconSize / 2) + 'px',
                        left:-(props.resizeIconSize / 2) + 'px',
                        width:props.resizeIconSize + 'px',
                        height:props.resizeIconSize + 'px'
                    }
                },
                {
                    class:'drag-lc',
                    style:{
                        top:(<number>style.height) / 2 - (props.resizeIconSize / 2) + 'px',
                        left:-(props.resizeIconSize / 2) + 'px',
                        width:props.resizeIconSize + 'px',
                        height:props.resizeIconSize + 'px'
                    }
                }
            ]
    })
  return {
    style,
    moveing,
    styleHandler,
    dragElResizeIcon
  }
}

export default render