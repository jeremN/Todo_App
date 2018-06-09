<template>
  <div class="container">
    <div id="app-wrapper" class="col-cm-12 col-md-6 col-md-offset-3">
        <app-header :todos="todos"></app-header>
        <hr>
        <app-tasks-list :todos="todos"></app-tasks-list>
        <hr>
        <transition appear
                    enter-class=""
                    enter-active-class="animated fadeInLeft"
                    leave-class=""
                    leave-active-class="animated fadeOutLeft" mode="out-in">
          
          <app-new-todo @todoAdded="newTodo" v-if="displayAddTask" key="addTodo"></app-new-todo>
          <app-categories v-if="displayCat" key="filterByCat"></app-categories>

        </transition>
    </div>
    <!--Buttons-->
    <div id="app-menu" class="row">
      <div class="col-cm-12 col-md-6 col-md-offset-3">
          
        <button id="add-task" class="btn btn-default col-md-2 col-sm-4 round-button" @click="showForm">
          <span class="glyphicon glyphicon-plus"></span>
        </button>

        <button id="show-category" class="btn btn-default col-md-2 col-sm-4 round-button" @click="showCat">
          <span class="glyphicon glyphicon-th-large"></span>
        </button>

        <!--Delete all-->
        <div id="deleteAll" class="col-md-8 col-sm-12">
          <div class="radiopills-lightBlue">
              <input type="checkbox" 
              name="category" value="allchecked" id="markAll" class="todo-Category" v-model="selectAllTask"/>
              <label class="todo-Category" value="selectAll" for="markAll">Marquer toutes les tâches</label>
          </div>
        </div>
      </div>
      <!--Delete all END-->

    </div>
    <!--Buttons END-->
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import TaskList from './components/TasksList.vue';
  import NewTodo from './components/NewTodo.vue';
  import Categories from './components/Categories.vue';

  import { eventBus } from './main';

  export default {
    data: function() {
        return {
          todos: this.getStorage(),
          storageKey: 'todoApp',
          todoList: {},
          menu: '',
          displayCat: false,
          displayAddTask: false,
          selectAllTask: false,
        }
    },
    watch: {
      todos: {
        handler: function(todos) {
          this.postStorage(this.todos);
          console.log(this.getStorage());
        },
        deep: true
      }
    },
    methods: {
      getStorage() {

        let el = [],
            this_str = localStorage.getItem(this.storageKey);

        if(this_str != null) {
          el = JSON.parse(this_str);
        }
        return el;
      },
      postStorage(el) {
        localStorage.setItem(this.storageKey, JSON.stringify(el));
      },
      newTodo(todo) {

        this.displayAddTask = false;
        
        if(todo) {

          this.todoList = {
            title: todo[0],
            date: todo[1],
            category: todo[2],
            checked: false
          };

        }

        this.todos.push(this.todoList);
        this.postStorage(this.todos);
        this.todoList = {};

      },
      todoDeleted(index) {
        this.todos.splice(index, 1);
        this.postStorage(this.todos);
      },
      getSelected(el) {
        
      },
      showForm() {
        this.displayAddTask = !this.displayAddTask;
        this.displayCat = false;
      },
      showCat() {
        this.displayAddTask = false;
        this.displayCat = !this.displayCat;     
      } 

    },
    created() {
      eventBus.$on('todoDeleted', (index) => {
        this.todoDeleted(index);
      });
      eventBus.$on('todoDone', ([index, checked]) => {
        this.todos[index]['checked'] = checked;
      });
    },
    components: {
      appHeader: Header,
      appTasksList: TaskList,
      appNewTodo: NewTodo,
      appCategories: Categories,

    }
  }
</script>

<style scoped>
  hr {
    border-top-color: #526080;
  }
</style>
