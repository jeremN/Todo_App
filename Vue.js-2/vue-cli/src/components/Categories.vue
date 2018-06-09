<template>
    <!--Category-->
    <div id="category" class="row">
        
        <h2>Catégories</h2>

        <!--Item wrapper-->
        <div id="task-category">
          
          <!--Category item-->
          <figure class="col-xs-5"  
          			v-for="category in categories" 
          			:class="category.name">
            <a :title="category.name" @click="filterTodos(category.name)">
              <figcaption>
                <h4>{{ category.name }}</h4>
              </figcaption>
            </a>
          </figure>
          <!--Category item END-->

        </div>
        <!--Item wrapper END-->

    </div>
    <!--Category END-->
</template>

<script>
	  import { categoriesMixins } from '../mixins/categoriesMixins';

	  export default {
	  		mixins: [categoriesMixins],
	  }
</script>