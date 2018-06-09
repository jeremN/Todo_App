<template>
    <!--Header-->
    <header id="head-box" class="row">
      <div class="col-md-10 col-sm-8">

        <h1>Accueil</h1>

        <div id="stat-box">

          <div class="stat-item">
            <span class='glyphicon glyphicon-ok'></span>
            <p id="done-count" class="counter">{{ countChecked }}</p>
          </div>

          <div class="stat-item">
            <span class='glyphicon glyphicon-hourglass'></span>
            <p id="pending-count" class="counter">{{ taskLeft }}</p>
          </div>
        </div>
      </div>

    </header>
    <!--Header END-->
</template>

<script>

  import { eventBus } from '../main';

	export default {
		props: ['todos'],
    computed: {
      taskLeft() {
        let count = this.todos.length - this.countChecked;
        if(count < 0 ) {
          return count = 0;
        }
        else {
          return count;
        }
      },
      countChecked() {

        let count = 0;

        for(let todo of this.todos) {

          if(todo.checked) {
            count++;
          }

        }
        return count;
      },
    },
  }
</script>