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
		
		var todos = getTodo(),
			pending ="", 
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

		//Count complete & pending elements
		var parent1 = document.getElementById("task-list").childNodes.length,
			parent2 = document.getElementById("completed-list").childNodes.length;
		
		document.querySelector("#pending-count").innerHTML = parent1;
		document.querySelector("#done-count").innerHTML = parent2;
		

		//Remove & complete button
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

		var thisId = this.getAttribute("id"), 
			todos = getTodo();

		todos.splice(thisId, 1);
		localStorage.setItem("todo", JSON.stringify(todos));

		showTodo();

		return false;
	}

	function taskComplete(){
		
		var i = this.getAttribute("id"),
			todos = getTodo();

		todos[i].task_code = 1;
		localStorage.setItem("todo", JSON.stringify(todos));

		showTodo();

		return false;
	}

	//Function found here : 
	//http://snippetrepo.com/snippets/toggleclass-with-pure-javascript
	function toggleClass(element, className){
		
	    if (!element || !className){
	        return;
	    }

	    var classString = element.className, nameIndex = classString.indexOf(className);
	    if (nameIndex == -1) {
	        classString += ' ' + className;
	    }
	    else {
	        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
	    }
	    element.className = classString;
	}


	var addTask = document.getElementById("add-task");

	addTask.addEventListener('click', function() {
   			toggleClass(addTask, 'open');
   			toggleClass(document.getElementById('add-form'), 'open');
	});

	document.getElementById("todo-form").addEventListener("submit", addTodo);

	showTodo();

	//window.setInterval(showTodo, 5000);
	//localStorage.removeItem("todo");
});