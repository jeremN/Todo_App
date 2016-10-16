'use strict';

var todoApp = angular.module('todoApp', []);

//Controleur de l'app
todoApp.controller('todoCtrl', ['$scope', 
	function($scope) {

		$scope.todos = [];

		$scope.appTitle = "ToDo List";
		$scope.appAddTask = "Add Task";
		$scope.saved = localStorage.getItem('todo');
		$scope.todos = (localStorage.getItem('todo') !== null) ? JSON.parse($scope.saved) : {}; 
		localStorage.setItem('todo', JSON.stringify($scope.todos));

		//Ajouter un todo
		$scope.addTodo = function(){

			$scope.todos.push({
				text: $scope.todoText,
				title: $scope.todoTitle,
				date: $scope.todoDate,
				code: $scope.todoCode, 
				done: false
			});

			$scope.todoText = '';
			$scope.todoTitle = '';
			$scope.todoDate = '';
			$scope.todoCode = 0;
			localStorage.setItem('todo', JSON.stringify($scope.todos));

		};
 
		//Marquer un todo comme terminé
		$scope.doneTodo = function(todo){

			$scope.todoCode = 1;
		};

		//Compte les todos
		$scope.remaining = function(){

			var count = 0;
			angular.forEach($scope.todos, function(todo){
				count+= todo.done ? 0 : 1;
			});

			return count;
		};

		//Compte les todos terminés
		$scope.complete = function(){
			var count = 0;
			angular.forEach($scope.todos, function(todo){
				count += todo.done ? 1 : 0;
			});
		}

		//Marque todo comme terminé
		$scope.archive = function(){

			var completed = $scope.todos;
			$scope.todoCode = 1;
			$scope.todos = [];
			angular.forEach(completed, function(todo){
				if(!todo.done){
					$scope.todos.push({
						todo,
						code: $scope.todoCode
					});
				}
			});
			localStorage.setItem('todo', JSON.stringify($scope.todos));
		};
	}
]);