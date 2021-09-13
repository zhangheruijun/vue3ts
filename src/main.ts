import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import mitt from 'mitt'; //代替event hub
const app = createApp(App)
// 相当于vue2.0中Vue.prototype.$cust = '挂载测试'
app.config.globalProperties.$cust = '挂载测试'
app.config.globalProperties.$mitt = mitt()
//全局指令
app.directive('custInst', {
	beforeMount(el, binding, vnode, prevVnode) {
		el.style.background = 'red'
		console.log(el, binding, vnode, prevVnode);
		el.addEventListener('click', () => {
			console.log('老惦记我');
			binding.value('蒹葭苍苍')
		})
	},
	// mounted() { },
	// beforeUpdate() { }, // 新
	// updated() { },
	// beforeUnmount() { }, // 新
	// unmounted() { }
})
app.use(Antd).use(store).use(router).mount('#app')
