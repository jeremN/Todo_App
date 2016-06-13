var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function(){

	function getTodo(){

		var todos = new Array;
		var todos_str = localStorage.getItem("todo");
		if (todos_str != null){
			todos = JSON.parse(todos_str);
		}
		return todos;
	}
	
	function showTodo(){
		
		var todos = getTodo();

		var html = "";
		for(i = 0; i < todos.length; i++){
			html += "<div class='todo-task'><h4>" + todos[i].task_title + "</h4><button class='complete btn btn-default' id='" + i + "'><span class='glyphicon glyphicon-ok'></span></button><button class='remove btn btn-default' id='" + i + "'><span class='glyphicon glyphicon-remove'></span></button><p>" + todos[i].task_description + "</p><p>" + todos[i].task_date + "</p></div>";
		};

		document.getElementById("task-list").innerHTML = html;
		console.log(todos);

		var removeBtn = document.getElementsByClassName("remove");
		for(i = 0; i < removeBtn.length; i++){
			removeBtn[i].addEventListener("click", delTodo);
		}
	}

	function addTodo(){

		var description = document.getElementById("todo-Description").value, 
			title = document.getElementById("todo-Title").value,
			date = document.getElementById("todo-Date").value;

		task = {

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

	function delTodo(){

		var thisId = this.getAttribute("id");

		var todos = getTodo();
		todos.splice(thisId, 1);
		localStorage.setItem("todo", JSON.stringify(todos));

		showTodo();

		return false;
	}

	document.getElementById("todo-form").addEventListener("submit", addTodo);
	showTodo();

	//window.setInterval(showTodo, 5000);
	//localStorage.removeItem("todo");

	/*localStorage reminder
	Save localStorage.setItem("key", "value");
	Get localStorage.getItem("key", "value");
	Delete localStorage.removeItem("key");
	*/

});