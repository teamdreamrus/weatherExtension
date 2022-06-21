import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
// import '../utils/fonts.less'

const initPopup = async () => {
  if (!document.body) {
    setTimeout(() => initPopup(), 50)
    return
  }

  createApp(App).use(store).mount('#app')
}

initPopup()
