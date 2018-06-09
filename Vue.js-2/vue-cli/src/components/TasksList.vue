<template>
    <!--Task-->
    <div id="task" class="row"> 
    	<div class="col-md-10 col-sm-12 col-md-offset-1">
		      
		<!--Pending task-->
		<div id="task" class="row" v-if="todos.length">
			<h2>Tâche en cours</h2>
			<transition-group id="task-list" 
								tag="div" 
								mode="out-in"
								appear
                            enter-class=""
                            enter-active-class="animated slideInLeft"
                            leave-class=""
                            leave-active-class="animated slideOutRight">
				<app-task
					v-for="(todo, index) in todos"
					:key="index"
					:todoIndex="index"
					:todoTitle="todo.title"
					:todoCategory="todo.category"
					:todoDate="todo.date"
					:todoChecked="todo.checked"
					:class="{done : todo.checked}">
				</app-task>
			</transition-group>
		</div>
		<!--Pending task END-->

		<!--Task list is empty-->
		<div class="no-task row" v-else>
			<h2>La liste est vide</h2>
		</div>
		<!--Task list is empty END-->
      </div>
    </div>
    <!--Task END-->
</template>

<script>
	import { eventBus } from '../main';
	import Task from './Task.vue';

	export default {
		props: ['todos'],
		methods: {

		},
		created() {
			eventBus.$on('todoDone', ([index, checked]) => {
				this.todos[index]['checked'] = checked;
			});
		},
		components: {
			appTask: Task,
		}
	}
</script>

<style>
    .slide-enter {
        opacity: 0;
    }
    .slide-enter-active {
        animation: slide-in .2s ease-out forwards;
        transition: opacity .15s;
    }
    .slide-leave {
        
    }
    .slide-leave-active {
        animation: slide-out .2s ease-out forwards;
        transition: opacity .15s;
        opacity: 0;
    }
    .slice-move {
        transition: transform 0.2s;
    }

    @keyframes side-in {
        from{
            transform: translateX(5%);
        }
        to {
            transform: translateX(0);
        }
    }
    @keyframes slide-out {
        from{
            transform: translateX(0);
        }
        to {
            transform: translateX(5%);
        }  
    }
</style>