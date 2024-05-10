let inputValue = document.querySelector("#inputBox");
let tasklist = document.querySelector("#tasklist");
let addbtn = document.querySelector("#addbtn");


addbtn.addEventListener("click", function () {
    if (inputValue.value.trim() === '') {
        alert("Please enter the task");
        return;
    }
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(tasks);
        if (!Array.isArray(taskObj)) {
            taskObj = [];
        }
    }

    let task = inputValue.value.trim();
    taskObj.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    inputValue.value = "";
    console.log(taskObj);
    showTasks(taskObj); // Pass taskObj to the showTasks function
});

function showTasks(taskObj) {
    // Clear the existing list
    tasklist.innerHTML = "";

    // Render each task
    taskObj.forEach(function (event, index) {
        var li = document.createElement("li");
        var delIcon = document.createElement("span");
        delIcon.innerHTML = '<i class="ri-delete-bin-line"></i>';
        li.textContent = event;
        li.className = "task-item";
        tasklist.appendChild(li);
        li.appendChild(delIcon);
        delIcon.addEventListener("click", function () {
            taskObj.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(taskObj));
            li.remove();
            showTasks(taskObj);
        });

    });
}

document.addEventListener("DOMContentLoaded", function () {
    let tasks = localStorage.getItem("tasks");
    let taskObj;
    if (tasks == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(tasks);
        if (!Array.isArray(taskObj)) {
            taskObj = [];
        }
    }
    showTasks(taskObj);
});