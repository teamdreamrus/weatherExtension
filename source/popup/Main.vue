<template>
  <div class="main">
    <current-block />
    <forecast-block />
  </div>
</template>
<script>
import CurrentBlock from './components/CurrentBlock.vue'
import ForecastBlock from './components/ForecastBlock.vue'

export default {
  name: 'MainComponent',
  components: {
    CurrentBlock,
    ForecastBlock
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
