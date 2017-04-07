var storageKey;

var lStorage = {

	get: function(type) {

		console.log(type);

		/*if (type === "todos") {

			storageKey = ""+type+"App";
			console.log(storageKey);

			var todos = [],
				todos_str = localStorage.getItem(storageKey);

			if (todos_str != null) {

				todos = JSON.parse(todos_str);

			}

			return todos;
		}
		else if (type === "notes") {

			storageKey = ""+type+"App";

			var notes = [],
				notes_str = localStorage.getItem(storageKey);

			if (todos != null) {

				notes = JSON.parse(notes_str);

			}

			return notes;
		}*/

		var stored = type,
			stored_str = localStorage.getItem(storageKey);

		if (str != null) {

			type = JSON.parse(str);
		}

		return 

	},

	save: function(type) {

		if (type === "todos") {

			storageKey = ""+type+"App";
			localStorage.setItem( storageKey, JSON.stringify(todos) );

		}
		else if (type === "notes") {

			storageKey = "noteApp";
			localStorage.setItem( storageKey, JSON.stringify(notes) );
			
		}


	}

};

//Create new Vue instance
new Vue({

	//Bind this instance to our container #todo-form
	el: "#app",

	//This is where we will register the values that hold the data for our application
	data: {

		todos: lStorage.get("todos"),
		notes: lStorage.get("notes"),
		newTodo: "",
		newDate: "",
		newNote: "",
		todoList: {},
		noteList: {}

	},

	watch: {

		todos: {

			handler: function(todos) {

				lStorage.save(todos);
			},

			//To detect nested values inside objects
			deep: true

		}

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

			var todo = this.newTodo.trim();
			var tDate = this.newDate;

			//if todo is not an empty string
			if ( todo ) {

				//Insert values in newTodo object
				todoList = {

					title: todo,
					date: tDate,
					checked: false

				};

				//Push an object containing the todo to tasklist array
				this.todos.push(todoList);

				//Reset newTodo to an empty string, so the input field is cleared
				this.newTodo = "";
				this.newDate = "";

				lStorage.save(todos);
				console.log(todos);
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