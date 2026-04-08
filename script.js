const form = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoContent = document.querySelector('#todo-content');

form.addEventListener("submit", e => {
    e.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('is-flex');

    const todoText = document.createElement('h3');
    todoText.textContent = todoInput.value;

    const todoDelete = document.createElement('button');
    todoDelete.textContent = 'X';
    todoDelete.setAttribute('id', 'delete');

    todoDiv.appendChild(todoDelete);
    todoDiv.appendChild(todoText);

    todoContent.appendChild(todoDiv);
    form.reset();
})


todoContent.addEventListener("click", e => {
    const target = e.target;
    if(target.getAttribute('id') == 'delete') todoContent.removeChild(e.target.parentNode);
})