<template>
  <div class="home">
     <Introduction></Introduction>
  </div>
  
</template>

<script>
// @ is an alias to /src
import Introduction from '@/components/Introduction.vue'

export default {
  name: 'Home',
  components: {
    Introduction
  }
}
</script>
<style>
</style>