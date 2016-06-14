var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function(){

	function getTodo(){

		var todos = new Array, 
			todos_str = localStorage.getItem("todo");
		if (todos_str != null){
			todos = JSON.parse(todos_str);
		}
		return todos;
	}
	
	function showTodo(){
		
		var todos = getTodo();

		var pending ="", 
			done = "";

		for(i = 0; i < todos.length; i++){

			if(todos[i].task_code === 0){

				pending += "<div class='todo-task'><p class='date-item'>" + todos[i].task_date + "</p><div class='head'><h4>" + todos[i].task_title + "</h4><div class='button'><button class='complete btn btn-default' id='" + i + "'><span class='glyphicon glyphicon-ok'></span></button><button class='remove btn btn-default' id='" + i + "'><span class='glyphicon glyphicon-remove'></span></button></div></div><p>" + todos[i].task_description + "</p></div>";
			}
			else{

				done += "<div class='todo-task'><p class='date-item'>" + todos[i].task_date + "</p><div class='head'><h4>" + todos[i].task_title + "</h4><div class='button'><button class='complete checked btn btn-default' id='" + i + "'><span class='glyphicon glyphicon-ok'></span></button><button class='remove btn btn-default' id='" + i + "'><span class='glyphicon glyphicon-remove'></span></button></div></div><p>" + todos[i].task_description + "</p></div>";
			}
		};


		document.getElementById("task-list").innerHTML = pending;
		document.getElementById("completed-list").innerHTML = done;

		var parent = document.getElementById("task-list").childNodes.length;
		console.log(parent);
		
		//console.log(todos);

		var removeBtn = document.getElementsByClassName("remove");
		for(i = 0; i < removeBtn.length; i++){
			removeBtn[i].addEventListener("click", delTodo);
		}

		var completeBtn = document.getElementsByClassName("complete");
		for(i = 0; i < completeBtn.length; i++ ){
			completeBtn[i].addEventListener("click", taskComplete);
		}
	}

	function addTodo(){

		var description = document.getElementById("todo-Description").value, 
			title = document.getElementById("todo-Title").value,
			date = document.getElementById("todo-Date").value;

		task = {

			task_title : title, 
			task_description : description, 
			task_date : date, 
			task_code : 0
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
	//show add panel
	function showPanel(){
		var btn = document.querySelector(".glyphicon-plus");
		var close = btn.animate([
			{transform: "rotate(0)"},
			{transform: "rotate(45deg)"}
			], 500);

	}

	function taskComplete(){
		
		var i = this.getAttribute("id");

		var todos = getTodo();
		todos[i].task_code = 1;
		localStorage.setItem("todo", JSON.stringify(todos));

		showTodo();

		return false;
	}

/*
	function getCount(parent, children){
		var actualCount = 0,
		var children = parent.childNodes.length;

		for(i = 0; i < children; i++){
			actualCount ++;
		}

		return actualCount;
	}*/

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