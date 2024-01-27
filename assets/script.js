let input = document.querySelector('#inputBx')
let list = document.querySelector('#list')

input.addEventListener('keyup', function(e) {
    if (e.key == 'Enter') {
        addItem(this.value);
        this.value = '';
    }
});

let addItem = (input) => {

    let listItem = document.createElement('li');
    listItem.innerHTML = `${input}<i></i>`;

    listItem.addEventListener('click', function() {
        listItem.classList.add('done');
    });

    listItem.querySelector('i').addEventListener('click', function() {
        listItem.remove();
    });

    list.appendChild(listItem);
};