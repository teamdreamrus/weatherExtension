<template>
  <div class="popup">
    <v-loader v-if="isLoading" />
    <main-component v-else />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import MainComponent from './Main.vue'
import vLoader from './Loader.vue'

export default {
  components: {
    MainComponent,
    vLoader
  },
  setup() {
    const store = useStore()
    const isLoading = computed(() => store.state.isLoading)
    store.dispatch('initPopup')
    return {
      isLoading
    }
  }
}
</script>

<style scoped lang="less">
// @import '~/utils/const.less';

.popup {
  width: 330px;
  height: 450px;
  background: linear-gradient(180deg, #62b8f6 0%, #2c79c1 77.96%);
  overflow: hidden;
  padding: 16px;
}
</style>
