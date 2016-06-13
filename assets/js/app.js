var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function(){

	//Show ToDo
	function showTodo(){
		var todos = getTodo();

		var html = "<div>";
		for(i = 0; i < todos.length; i++){
			html += "<h4>" + todos[i] + "</h4>";
		};
		html += "</div>";

		document.getElementById("task-list").innerHTML = html;
		console.log(todos);
	}

	//get ToDo
	function getTodo(){

		var todos = new Array;
		var todos_str = localStorage.getItem("todo");
		if (todos_str != null){
			todos = JSON.parse(todos_str);
		}
		return todos;
	}

	//Add ToDo
	function addTodo(){


		var description = document.getElementById("todo-Description").value;
		var title = document.getElementById("todo-Title").value;
		var date = document.getElementById("todo-Date").value;

		var id = new Date().getTime();

		var task = [

			id,
			title, 
			description, 
			date
		];



		var todos = getTodo();
		todos.push(task);


		localStorage.setItem("todo", JSON.stringify(todos));

		showTodo();

		return false;
	}

	//Delete ToDo
	/*function delTodo(){

	}*/

	document.getElementById("todo-form").addEventListener("submit", addTodo);
	window.setInterval(showTodo, 5000);
	//localStorage.removeItem("todo");

	/*localStorage
	//Save localStorage.setItem("key", "value");
	//Get localStorage.getItem("key", "value");
	//Delete localStorage.removeItem("key");
	*/

});