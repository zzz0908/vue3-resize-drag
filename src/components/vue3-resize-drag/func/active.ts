import { watch } from 'vue';
function active(props: any, emit: Function) {
    // 监听是否激活
    watch(() => {
        return props.isActive
    },
    (n) => {
        if(n){
            emit('activated',{
                
            })
        }else{
            emit('deactivated',{
                
            })
        }
    })
}
export default active