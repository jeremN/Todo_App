<template>
	<!--Buttons-->
	<div class="row">
		<button id="add-task" class="btn btn-default col-md-2 col-sm-4 round-button" @click="selectedComponent = 'newTaskForm'">
			<span class="glyphicon glyphicon-plus"></span>
		</button>

		<button id="show-category" class="btn btn-default col-md-2 col-sm-4 round-button" @click="selectedComponent = 'showCategories'">
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
		<!--Delete all END-->

	</div>
	<!--Buttons END-->

</template>

<script>
	
	export default {
		data: function() {
			return {
				displayCat: false,
				displayAddTask: false,
				selectAllTask: false,
				selectedComponent: '',
			}
		},
		watch: {
			selectAllTask() {
				console.log(this.selectAll);
				this.$emit('selectAllTask', this.selectAllTask);
			},
			selectedComponent() {
				console.log(this.selectedComponent);
				this.$emit('menuSelection', this.selectedComponent);
			}
		},
		methods: {

		},
	}

</script>

<style>
</style>