import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 引入emelent-ui组件库
import ElementUI from 'element-ui'
// 引入element-ui全局样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//全局组件注册
import component from './common/index'
for(let k in component ){
  Vue.component(k,component[k])
}
//引入echarts图表
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
