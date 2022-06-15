<template>
  <div class="main">
    <current-block />
  </div>
</template>
<script>
import CurrentBlock from './components/CurrentBlock.vue'

export default {
  name: 'MainComponent',
  components: {
    CurrentBlock
  },
  setup() {
    return {}
  }
}
</script>
<style lang="less">
@import '../utils/fonts.less';
.main {
  font-family: OpenSans;
}
</style>
