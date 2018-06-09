<template>
        <!--Add task Form-->
        <div id="add-form" class="task-form row">

          <div class="col-sm-12">
            <h2>Ajouter une tâche</h2>
            
            <!--Add task form-->
            <form id="todo-form" class="col-md-10 col-sm-12 col-md-offset-1">
  
              <div class="form-group">
                <label for="title">Task</label>
                <input id="todo-Title" class="form-control" name="title" v-model="newTodo" required>
              </div>

              <div class="form-group">
                <label for="date">Date</label>
                <input id="todo-Date" class="form-control" name="date" type="date" v-model="newDate"/>
              </div>
  
              <!--Input Radio Pills-->
              <div class="radiopills radiopills-container">
                
                <!--Pills wrapper-->
                <div class="radiopills-wrap">
                  
                  <!--Pills items-->
                  <div class="radiopills-item" v-for="(cat, index ) in categories" :class="cat.name">
                      <app-category-pill>
                        <input type="radio" name="category" class="todo-Category" 
                          :id="index" 
                          v-model="newCat" 
                          :value="cat.name"/>
                        <label class="todo-Category" value="Personnel" :for="index">{{ cat.name }}</label>
                      </app-category-pill>
                  </div>
                  <!--Pills items END-->

                </div>
                <!--Pills wrapper END-->

              </div>
              <!--Input Radio Pills END-->

              <button id="todo-submit" class="btn btn-primary btn-submit" @click.prevent="addTodo">Ajouter une tâche</button>

            </form>
            <!--Add task form END-->

          </div>
        </div>
        <!--Add task form END-->
  <!--./Todo item-->
</template>

<script>

  import CategoryPill from './CategoryPill.vue';

  import { categoriesMixins } from '../mixins/categoriesMixins';

	export default {
    mixins: [categoriesMixins],
    data() {
      return {
        newTodo: '',
        newDate: '',
        newCat: '',
      }
    },
    methods: {
      addTodo() {
        this.$emit('todoAdded', [this.newTodo, this.newDate, this.newCat]);
        this.newTodo = '';
        this.newDate = '';
        this.newCat = '';
      }
    },
    components: {
      appCategoryPill: CategoryPill,
    }
	}
</script>

<style>
</style>