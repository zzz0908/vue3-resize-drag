<template>
  <entryCpn />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import entryCpn from './components/index.vue'
export default defineComponent({
  name: 'App',
  components:{
    entryCpn
  }
});
</script>