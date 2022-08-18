<template>
    <biyi-icon
      :color="color"
      :icon-class="svg"
      style="height:100%;width:100%"/>
</template>

<script>
import biyiIcon from 'biyi-icon'
export default {
  components: {
    biyiIcon
  },
  data() {
    return {
      svg: '机房',
      color:'#00DEDE'
    }
  }
}
</script>

<style scoped>
</style>