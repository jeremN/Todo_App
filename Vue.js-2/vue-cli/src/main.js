import Vue from 'vue'
import App from './App.vue'

Vue.use(require('vue-moment'));

export const eventBus = new Vue({
	data() {
		return {
		}
	},
	methods: {
		deleteTodo(index) {
			this.$emit('todoDeleted', index);
		},
		checkedTodo(index, checked) {
			this.$emit('todoDone', [index, checked]);
		},
	}
});

new Vue({
  el: '#app',
  render: h => h(App)
})
