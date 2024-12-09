const todoList = document.querySelector("#list-td");
const todoSubmit = document.querySelector("#submit-td");
const todoInput = document.querySelector("#input-td");
const addTodoBox = document.querySelector('#a-todo');
const addTodoBtn = document.querySelector('#a-todo-btn');
const todoForm = document.querySelector("#todoForm");
const doingList = document.querySelector("#list-dg");
const dingSubmit = document.querySelector("#submit");
const doingInput = document.querySelector("#input-dg");
const addDoingBox = document.querySelector('#a-doing');
const addDoingBtn = document.querySelector('#a-doing-btn');
const doingForm = document.querySelector("#doingForm");
const doneList = document.querySelector("#list-dn");
const doneSubmit = document.querySelector("#submit");
const doneInput = document.querySelector("#input-dn");
const addDoneBox = document.querySelector('#a-done');
const addDoneBtn = document.querySelector('#a-done-btn');
const doneForm = document.querySelector("#doneForm");

addTodoBtn.addEventListener('click', () => {
    addTodoBox.classList.remove('hidden');
    todoInput.focus();
})
addDoingBtn.addEventListener('click', () => {
    addDoingBox.classList.remove('hidden');
    doingInput.focus();
})
addDoneBtn.addEventListener('click', () => {
    addDoneBox.classList.remove('hidden');
    doneInput.focus();
})

todoForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = todoInput.value;

    if (title === "") {
        alert("Please input a ToDo");
    } else {
        console.log("Sending request to server with title: ", title);
        try {
            const response = await fetch("/addTodo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                }),
            });
            if (response.ok) {
                const newTodo = await response.json();
                manTodo(newTodo.title);
                addTodoBox.classList.add('hidden');
            } else if (response.status === 401) {
                alert("Please login to add todo");
                window.location.href = "/";
            } else {
                alert("Failed to add todo");
            }
        } catch (err) {
            console.error("Error: ", err);
            alert("Error adding todo");
        }
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
        try {
            const response = await fetch("/addDoing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                }),
            });
            if (response.ok) {
                const newDoing = await response.json();
                manDoing(newDoing.title);
                addDoingBox.classList.add('hidden');
            } else if (response.status === 401) {
                alert("Please login to add Doing Task");
                window.location.href = "/";
            } else {
                alert("Failed to add Doing Task");
            }
        } catch (err) {
            console.error("Error: ", err);
            alert("Error adding Doing Task");
        }
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
        try {
            const response = await fetch("/addDone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                }),
            });
            if (response.ok) {
                const newDone = await response.json();
                manDone(newDone.title);
                addDoneBox.classList.add('hidden');
            } else if (response.status === 401) {
                alert("Please login to add Done Task");
                window.location.href = "/";
            } else {
                alert("Failed to add Done Task");
            }
        } catch (err) {
            console.error("Error: ", err);
            alert("Error adding Done Task");
        }
        doneInput.value = "";
    }
});

// Manage todo
const manTodo = (title) => {
    const listItem = document.createElement("li");
    // listItem.setAttribute('draggable', true)
    // listItem.setAttribute('ondragstart', drag(event))
    listItem.id = `todo-${title}`;
    listItem.innerHTML = `<li id="todo-{todo.title}" draggable="true" ondragstart="drag(event)" class="bg-white rounded-lg p-3 mb-3 cursor-pointer shadow-md hover:shadow-lg duration-300"> <div class="flex justify-start"> <img class="w-5 h-5" src="./img/icons8-tick-mark-96.png"> <h3 class="text-slate-900 font-bold ml-2"> ${title} </h3> </div> </li>`;
    todoList.appendChild(listItem);
};
const manDoing = (title) => {
    const listItem = document.createElement("li");
    // listItem.setAttribute('draggable', true);
    // listItem.setAttribute('ondragstart', drag(event));
    listItem.id = `doing-${title}`;
    listItem.innerHTML = `<li id="todo-{todo.title}" draggable="true" ondragstart="drag(event)" class="bg-white rounded-lg p-3 mb-3 cursor-pointer shadow-md hover:shadow-lg duration-300"> <div class="flex justify-start"> <img class="w-5 h-5" src="./img/icons8-tick-mark-96.png"> <h3 class="text-slate-900 font-bold ml-2"> ${title} </h3> </div> </li>`;
    doingList.appendChild(listItem);
}
const manDone = (title) => {
    const listItem = document.createElement("li");
    // listItem.setAttribute('draggable', true);
    // listItem.setAttribute('ondragstart', drag(event));
    listItem.id = `done-${title}`;
    listItem.innerHTML = `<li id="todo-{todo.title}" draggable="true" ondragstart="drag(event)" class="bg-white rounded-lg p-3 mb-3 cursor-pointer shadow-md hover:shadow-lg duration-300"> <div class="flex justify-start"> <img class="w-5 h-5" src="./img/icons8-tick-mark-96.png"> <h3 class="text-slate-900 font-bold ml-2"> ${title} </h3> </div> </li>`;
    doneList.appendChild(listItem);
}

// Drag and drop
function allowDrop(ev) {
    ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("Todo", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("Todo");
        if (ev.target.tagName === "UL") {
          ev.target.appendChild(document.getElementById(data));
        } else {
          ev.preventDefault();
        }
    }

// // Old manage todo
// const manTodo = (title) => {
//     const listItem = document.createElement("li");
//     listItem.innerHTML = `${title} <i></i>`;
//     listItem.addEventListener("click", () => {
//         listItem.classList.add("done");
//     });
//     listItem.querySelector("i").addEventListener("click", () => {
//         listItem.remove();
//     });
//     todo.appendChild(listItem);
// };
