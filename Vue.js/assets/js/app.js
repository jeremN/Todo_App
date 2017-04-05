var storageKey = "todoApp";

var todoStorage = {

	get: function() {

		var todos = JSON.parse( localStorage.getItem(storageKey) || '[]' );

		return todos;

	},

	save: function(todos) {

		localStorage.setItem( storageKey, JSON.stringify(todos) );

	}

};

//Create new Vue instance
new Vue({

	//Bind this instance to our container #todo-form
	el: "#todo",

	//This is where we will register the values that hold the data for our application
	data: {

		todos: todoStorage.get(),
		newTodo: "",
		newDate: "",
		todoList: {}

	},

	computed: {

		allSelected: function() {

			//Check if every checked property returns true and if there is at least one todo item
			return this.todos.every( function(todo) {

				return todo.checked;
			
			}) && this.todos.length > 0;

		}

	},

	//This is where we will hold the methods we want to use in our application
	methods: {

		addTodo: function() {

			var todo = this.newTodo;
			var tDate = this.newDate;

			//if todo is not an empty string
			if ( todo ) {

				//Insert values in newTodo object
				this.todoList = {

					title: todo,
					date: tDate

				}

				//Push an object containing the todo to tasklist array
				this.todos.push(todoList);

				//Reset newTodo to an empty string, so the input field is cleared
				this.newTodo = "";
				this.newDate = "";

				todoStorage.save(todos);
			}
			else {

				return;
			
			}
		},

		removeTodo: function(todo) {

			//Grab the index of this task and use splice() array method to delete it from the array
			var index = this.todos.indexOf(todo);
			this.todos.splice( index, 1 );

		},

		clearList: function() {

			//Setting todoList to an empty array clears the whole list
			this.todos = [];

		},

		selectAll: function(todo) {

			//targetValue is set to the opposite of allSelected
			var targetValue = this.allSelected ? false : true;

			//Use a for loop to set the checked state of all items to the target value
			for ( var i = 0; i < this.todos.length; i++ ) {

				this.todos[i].checked = targetValue;

			}

		}

	}

});