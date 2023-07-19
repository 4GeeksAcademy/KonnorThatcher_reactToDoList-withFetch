import React from "react";
import ToDoList from "./todolist";
//include images into your bundle

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1>To-Do List 2: Electric Boogaloo</h1>
			<ToDoList />
		</div>
	);
};

export default Home;
