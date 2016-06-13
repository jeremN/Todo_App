var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function(){


	//Show ToDo
	function showTodo(){
		var todos = getTodo();

		var html = "<div class='todo-task'>";
		for(i = 0; i < todos.length; i++){
			html += "<h4>" + todos[i].task_title + "</h4><button class='remove' id='" + todos[i].task_id + "'> Delete Todo </button> </br><p>" + todos[i].task_description + "</p><p>" + todos[i].task_date + "</p>";
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

		task = {

			task_id : id,
			task_title : title, 
			task_description : description, 
			task_date : date
		};

		var todos = getTodo();
		todos.push(task);
		localStorage.setItem("todo", JSON.stringify(todos));

		showTodo();

		return false;
	}

	//Delete ToDo
	function delTodo(){

		var thisId = this.getAttribute("id");

		var todos = getTodo();

		todos.splice(thisId, 1);
		localStorage.setItem("todo", JSON.stringify(todos));

		showTodo();

		return false;

	}

	document.getElementById("todo-form").addEventListener("submit", addTodo);
	document.getElementsByClassName("remove").addEventListener("click", delTodo);

	showTodo();
	//window.setInterval(showTodo, 5000);
	//localStorage.removeItem("todo");

	/*localStorage
	//Save localStorage.setItem("key", "value");
	//Get localStorage.getItem("key", "value");
	//Delete localStorage.removeItem("key");
	*/

});