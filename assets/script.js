let input = document.querySelector('#inputBx')
let todo = document.querySelector('#list')
let submit = document.querySelector('#submit')
let shomar = document.querySelector('#shomarande')

document.addEventListener('DOMContentLoaded', localStorageOnload)

// eventListener button
submit.addEventListener('click', function() {
    if (input.value === '') {
        alert("Please input any word");
    } else {
        addItem(input.value);
        input.value = '';
    };
});

// eventListener Enter Key
input.addEventListener('keyup', function(e) {
    if (e.key == "Enter") {
        if (this.value === '') {
            alert("Please input any word");
        } else {
            addItem(this.value);
            this.value = '';
        };
    };
});

// add li tag
let addItem = (input) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${input}<i></i>`;
    listItem.addEventListener('click', function() {
        listItem.classList.add('done');
    });
    listItem.querySelector('i').addEventListener('click', function() {
        listItem.remove();
    });
    todo.appendChild(listItem);
    addTodoLocalStorage(todo);
};

//local storage
function addTodoLocalStorage(todo){
    const todos = getTodoLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodoLocalStorage() {
    let todos;
    let getTodo = localStorage.getItem('todos');
    if (getTodo === null) {
        todos = [];
    } else {
        todos = JSON.parse(getTodo);
    }
    return todos;
};

function localStorageOnload() {
    const todos = getTodoLocalStorage();
    todos.forEach(function(todo) {
        input
    });
};