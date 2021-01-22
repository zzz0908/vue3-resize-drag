<template>
    <vue3ResizeDrag :x="150" :y="100" :zIndex="1">
        哈哈
    </vue3ResizeDrag>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import vue3ResizeDrag from '@/components/vue3-resize-drag.vue'
export default defineComponent({
  name: 'entry',
  components:{
      vue3ResizeDrag
  }
});
</script>