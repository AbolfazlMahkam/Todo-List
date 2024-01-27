let input = document.querySelector('#inputBx')
let todo = document.querySelector('#list')

document.addEventListener('DOMContentLoaded', localStorageOnload)

input.addEventListener('keyup', function(e) {
    if (e.key == 'Enter') {
        addItem(this.value);
        this.value = '';
    }
});

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
    addTodoLocalStorage(todo)
};

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
    return todos
};

function localStorageOnload() {
    const todos = getTodoLocalStorage();
    todos.forEach(function(todo) {
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
            addTodoLocalStorage(todo)
        };
    });
};