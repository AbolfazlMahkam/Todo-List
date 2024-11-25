const todo = document.querySelector("#list");
const input = document.querySelector("#input");
const form = document.querySelector("#todoForm");
const submit = document.querySelector("#submit");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = input.value;

    if (title === "") {
        alert("Please input a ToDo");
    } else {
        console.log("Sending request to server with title: ", title);
        try {
            const response = await fetch("http://localhost:9500/home", {
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
            } else {
                alert("Failed to add todo");
            }
        } catch (err) {
            console.error("Error: ", err);
            alert("Error adding todo");
        }
        input.value = "";
    }
});

// eventListener button
submit.addEventListener("submit", function () {
    if (input.value === "") {
        alert("Please input any word");
    } else {
        manTodo(input.value);
        input.value = "";
    }
});

// eventListener Enter Key
input.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        if (input.value === "") {
            // alert("Please input any word");
        } else {
            manTodo(input.value);
            input.value = "";
        }
    }
});

// manage todo
const manTodo = (title) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${title} <i></i>`;
    listItem.addEventListener("click", () => {
        listItem.classList.add("done");
    });
    listItem.querySelector("i").addEventListener("click", () => {
        listItem.remove();
    });
    todo.appendChild(listItem);
};
