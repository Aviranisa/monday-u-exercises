const newToDo_txt = document.getElementById("NewToDo_txt");
const newToDo_btn = document.getElementById("NewToDo_btn");
const tasksList = document.getElementById("taskList");
const clearAll_btn = document.getElementById("clearAll");
const emptyState = document.getElementById("emptyState");
const amountTasks = document.getElementById("amountTasks");

let taskCount = 0;

newToDo_btn.addEventListener("click", () => {
	if (newToDo_txt.value) {
		const taskElement = document.createElement("div");
		taskElement.innerText = newToDo_txt.value;
		taskElement.classList.add("clickable", "task-element");
		taskElement.addEventListener("click", () => {
			alert(taskElement.innerText);
		});

		const deleteTask = document.createElement("div");
		deleteTask.classList.add("clickable", "delete-button");

		const trashImg = document.createElement("img");
		trashImg.src = "trash.png";
		trashImg.className = "tash-icon";

		deleteTask.addEventListener("click", (e) => {
			e.stopPropagation();
			taskElement.remove();
			incDecTaskCount("dec");
		});

		deleteTask.appendChild(trashImg);
		taskElement.appendChild(deleteTask);
		tasksList.appendChild(taskElement);
		incDecTaskCount("inc");
	} else {
		alert("Write your task first");
		return;
	}
	newToDo_txt.value = "";
});

clearAll_btn.addEventListener("click", () => {
	tasksList.innerHTML = "";
	tasksList.appendChild(amountTasks);
	tasksList.appendChild(emptyState);
	incDecTaskCount(0);
});

function isEmptyState() {
	if (taskCount === 0) {
		clearAll_btn.style.display = "none";
		emptyState.style.display = "block";
	} else {
		emptyState.style.display = "none";
		clearAll_btn.style.display = "block";
	}
}

function displayAmountTasks() {
	amountTasks.innerText = `${taskCount} Active tasks`;
}
displayAmountTasks();

function incDecTaskCount(type) {
	if (type === "inc") {
		taskCount++;
	} else if (taskCount > 0 && type === "dec") {
		taskCount--;
	} else if (type === 0) {
		taskCount = 0;
	}
	displayAmountTasks();
	isEmptyState();
}
