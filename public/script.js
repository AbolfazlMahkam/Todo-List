const todoList = document.querySelector("#list-td");
const todoSubmit = document.querySelector("#submit-td");
const todoInput = document.querySelector("#input-td");
const addTodoBox = document.querySelector('#a-todo');
const addTodoBtn = document.querySelector('#a-todo-btn');
const todoForm = document.querySelector("#todoForm");
const doingList = document.querySelector("#list-dg");
const dingSubmit = document.querySelector("#submit-dg");
const doingInput = document.querySelector("#input-dg");
const addDoingBox = document.querySelector('#a-doing');
const addDoingBtn = document.querySelector('#a-doing-btn');
const doingForm = document.querySelector("#doingForm");
const doneList = document.querySelector("#list-dn");
const doneSubmit = document.querySelector("#submit-dn");
const doneInput = document.querySelector("#input-dn");
const addDoneBox = document.querySelector('#a-done');
const addDoneBtn = document.querySelector('#a-done-btn');
const doneForm = document.querySelector("#doneForm");

function loadTodo() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/getTodo", true);
    xhr.onload = function () {
        if (this.status == 200) {
            const todoLi = JSON.parse(this.responseText);

            todoList.innerHTML = "";

            for (const todoTask of todoLi.todos) {
                const li = document.createElement("li");
                li.id = `${todoTask._id}`;
                li.setAttribute('draggable', "true");
                li.setAttribute('ondragstart', "drag(event)");
                li.className = 'bg-white rounded-lg p-3 mb-3 cursor-pointer shadow-md hover:shadow-lg duration-300';
                li.innerHTML = `<div class="flex justify-start"> <img class="w-5 h-5" src="./img/icons8-tick-mark-96.png"> <h3 id="td-child" class="text-slate-900 font-bold ml-2"> ${todoTask.title} </h3> </div>`;
                todoList.append(li)
            }
        }

    }
    xhr.send();
}
loadTodo();

function loadDoing() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/getTodo", true);
    xhr.onload = function () {
        if (this.status == 200) {
            const doingLi = JSON.parse(this.responseText);

            doingList.innerHTML = "";

            for (const todoTask of doingLi.doings) {
                const li = document.createElement("li");
                li.id = `${todoTask._id}`;
                li.setAttribute('draggable', "true");
                li.setAttribute('ondragstart', "drag(event)");
                li.className = 'bg-white rounded-lg p-3 mb-3 cursor-pointer shadow-md hover:shadow-lg duration-300';
                li.innerHTML = `<div class="flex justify-start"> <img class="w-5 h-5" src="./img/icons8-tick-mark-96.png"> <h3 id="td-child" class="text-slate-900 font-bold ml-2"> ${todoTask.title} </h3> </div>`;
                doingList.append(li);
            }
        }

    }
    xhr.send();
}
loadDoing();

function loadDone() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/getTodo", true);
    xhr.onload = function () {
        if (this.status == 200) {
            const doingLi = JSON.parse(this.responseText);

            doneList.innerHTML = "";

            for (const todoTask of doingLi.dones) {
                const li = document.createElement("li");
                li.id = `${todoTask._id}`
                li.setAttribute('draggable', "true");
                li.setAttribute('ondragstart', "drag(event)");
                li.className = 'bg-white rounded-lg p-3 mb-3 cursor-pointer shadow-md hover:shadow-lg duration-300';
                li.innerHTML = `<div class="flex justify-start"> <img class="w-5 h-5" src="./img/icons8-tick-mark-96.png"> <h3 id="td-child" class="text-slate-900 font-bold ml-2"> ${todoTask.title} </h3> </div>`;
                doneList.append(li);
            }
        }

    }
    xhr.send();
}
loadDone();

addTodoBtn.addEventListener('click', () => {
    addTodoBox.classList.remove('opacity-0');
    addTodoBox.classList.remove('absolute');
    addTodoBox.classList.remove('h-0');
    addTodoBox.classList.add("h-32");
    todoInput.focus();
})
addDoingBtn.addEventListener('click', () => {
    addDoingBox.classList.remove('opacity-0');
    addDoingBox.classList.remove('absolute');
    addDoingBox.classList.remove('h-0');
    addDoingBox.classList.add("h-32");
    doingInput.focus();
})
addDoneBtn.addEventListener('click', () => {
    addDoneBox.classList.remove('opacity-0');
    addDoneBox.classList.remove('absolute');
    addDoneBox.classList.remove('h-0');
    addDoneBox.classList.add("h-32");
    doneInput.focus();
})

todoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = todoInput.value;

    if (title === "") {
        alert("Please input a ToDo");
    } else {
        console.log("Sending request to server with title: ", title);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/addTodo", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    loadTodo();
                    addTodoBox.classList.add('opacity-0');
                    addTodoBox.classList.add('absolute');
                    addTodoBox.classList.add('h-0');
                } else if (xhr.status === 401) {
                    alert("Please login to add todo");
                    window.location.href = "/";
                } else {
                    alert("Failed to add todo");
                }
            }
        };

        xhr.onerror = function () {
            console.error("Error: ", xhr.statusText, { message: err.message });
            alert("Error adding todo");
        };

        xhr.send(JSON.stringify({
            title: title,
            status: "todo",
        }));

        todoInput.value = "";
    }
});

doingForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = doingInput.value;

    if (title === "") {
        alert("Please input a Doing Task");
    } else {
        console.log("Sending request to server with title: ", title);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/addTodo", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    loadDoing();
                    addDoingBox.classList.add('opacity-0');
                    addDoingBox.classList.add('absolute');
                    addDoingBox.classList.add('h-0');
                } else if (xhr.status === 401) {
                    alert("Please login to add Doing Task");
                    window.location.href = "/";
                } else {
                    alert("Failed to add Doing Task");
                }
            }
        };

        xhr.onerror = function () {
            console.error("Error: ", xhr.statusText, { message: err.message });
            alert("Error adding Doing Task");
        };

        xhr.send(JSON.stringify({
            title: title,
            status: "doing",
        }));

        doingInput.value = "";
    }
});

doneForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = doneInput.value;

    if (title === "") {
        alert("Please input a Done Task");
    } else {
        console.log("Sending request to server with title: ", title);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/addTodo", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    loadDone();
                    addDoneBox.classList.add('opacity-0');
                    addDoneBox.classList.add('absolute');
                    addDoneBox.classList.add('h-0');
                } else if (xhr.status === 401) {
                    alert("Please login to add Done Task");
                    window.location.href = "/";
                } else {
                    alert("Failed to add Done Task");
                }
            }
        };

        xhr.onerror = function () {
            console.error("Error: ", xhr.statusText, { message: err.message });
            alert("Error adding Done Task");
        };

        xhr.send(JSON.stringify({
            title: title,
            status: "done",
        }));

        doneInput.value = "";
    }
});


// Drag and drop
function allowDrop(ev) {
    ev.preventDefault();
};

function drag(ev) {
    ev.dataTransfer.setData("Todo", ev.target.id);
};

async function drop(ev) {
    ev.preventDefault();
    var taskId = ev.dataTransfer.getData("Todo");

    if (ev.target.tagName === "UL") {
        ev.target.appendChild(document.getElementById(taskId));
        if (ev.target.id === "list-dg") {
            const newStatus = "doing";
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", `/udStatus/${taskId}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        loadDoing();
                    } else if (xhr.status === 401) {
                        alert("Please login to add Done Task");
                        window.location.href = "/";
                    } else {
                        alert("Failed to Update Doing Task");
                        console.error("Error: ", xhr.status);
                    }
                }
            };

            xhr.onerror = function () {
                console.error("Error: ", xhr.statusText, { message: err.message });
                alert("Error adding Done Task");
            };

            xhr.send(JSON.stringify({
                status: newStatus,
            }));
        } else if (ev.target.id === "list-dn") {
            const newStatus = "done";
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", `/udStatus/${taskId}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        loadDone();
                    } else if (xhr.status === 401) {
                        alert("Please login to Update Done Task");
                        window.location.href = "/";
                    } else {
                        alert("Failed to Update Done Task");
                        console.error("Error: ", xhr.status);
                    }
                }
            };

            xhr.onerror = function () {
                console.error("Error: ", xhr.statusText, { message: err.message });
                alert("Error Update Done Task");
            };

            xhr.send(JSON.stringify({
                status: newStatus,
            }));
        } else if (ev.target.id === "list-td") {
            const newStatus = "todo";
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", `/udStatus/${taskId}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        loadTodo();
                    } else if (xhr.status === 401) {
                        alert("Please login to add Done Task");
                        window.location.href = "/";
                    } else {
                        alert("Failed to Update Doing Task");
                        console.error("Error: ", xhr.status);
                    }
                }
            };

            xhr.onerror = function () {
                console.error("Error: ", xhr.statusText, { message: err.message });
                alert("Error adding Done Task");
            };

            xhr.send(JSON.stringify({
                status: newStatus,
            }));
        }
    } else {
        ev.preventDefault();
    };
};
