<template>
  <!--Todo item-->
  <div :id="'task-' + todoIndex" 
       :class="'todo-task ' + todoCategory">
    <!--<p class='item-date'>{{ todoDate | dateFormat }}</p>-->
    <p class="item-date">{{ todoDate | moment("DD/MM/YYYY")}}</p>
    <div class='head'>
      <h4>{{ todoTitle }}&nbsp;&nbsp;<small>{{ todoCategory }}</small></h4>

      <!--Remove btn-->
      <div class='button'>
        <input type="checkbox" class='complete btn btn-default' v-model="isDone">
        <button class='remove btn btn-default' @click="removeElement">
          <span class='glyphicon glyphicon-remove'></span>
        </button>
      </div>
      <!--./Remove btn-->
    
    </div>
  </div>
  <!--./Todo item-->
</template>

<script>
  import { eventBus } from '../main';

	export default {
    props: ['todoDate', 'todoTitle', 'todoCategory', 'todoIndex', 'todoChecked'],
    data() {
      return {
        isDone: this.todoChecked,
      }
    },
    watch: {
      isDone() {
        eventBus.checkedTodo(this.todoIndex, this.isDone);
      }
    },
    methods: {
      removeElement() {
        eventBus.deleteTodo(this.todoIndex);
      },
    }
	}
</script>

<style>
</style>