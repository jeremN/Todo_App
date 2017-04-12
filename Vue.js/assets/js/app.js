var storageKey;

var lStorage = {

	setKey: function(key){

		if( key === "todos") {

			storageKey = "todoApp";

		}
		else if (key === "notes") {

			storageKey = "noteApp";

		}

		return storageKey;
	},
	
	get: function(el) {

		lStorage.setKey(el);

		var el = [],
			this_str = localStorage.getItem(storageKey);

		if ( this_str != null) {

			el = JSON.parse(this_str);

		}

		return el;

	},

	save: function(el) {

		localStorage.setItem( storageKey, JSON.stringify(el) );

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

		},

		notes: {

			handler: function(notes) {

				lStorage.save(notes);
			},

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
			if (todo) {

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

			}

		},

		addNote: function(){

			var note = this.newNote;

			if (note) {

				noteList = {

					title: note,
					checked: false
				};

				this.notes.push(noteList);

				this.newNote = "";

				lStorage.save(notes);
			}
		},

		removeTodo: function(todo) {

			//Grab the index of this task and use splice() array method to delete it from the array
			var index = this.todos.indexOf(todo);
			this.todos.splice( index, 1 );

		},

		removeNote: function(note) {

			//Grab the index of this task and use splice() array method to delete it from the array
			var index = this.notes.indexOf(note);
			this.notes.splice( index, 1 );

		},

		clearList: function() {

			//Setting todoList to an empty array clears the whole list
			this.todos = [];
			this.notes = [];

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