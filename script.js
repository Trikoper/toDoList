const form = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoContent = document.querySelector('#todo-content');


// document.addEventListener('DOMContentLoaded', () => {
    let testList = localStorage.getItem("toDoList");
    let toDoListNotes;
    if (testList !== null){
        toDoListNotes = JSON.parse(testList);
        toDoListNotes.forEach(note => {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('is-flex');

            const todoText = document.createElement('h3');
            todoText.textContent = note;

            const todoDelete = document.createElement('button');
            todoDelete.textContent = 'X';
            todoDelete.setAttribute('id', 'delete');

            const todoEdit = document.createElement('button');
            todoEdit.textContent = 'Edit';
            todoEdit.setAttribute('id', 'edit');

            todoDiv.appendChild(todoDelete);
            todoDiv.appendChild(todoEdit);
            todoDiv.appendChild(todoText);
            todoContent.appendChild(todoDiv);
        })
    }
    else toDoListNotes = [];
// });

form.addEventListener("submit", e => {
    e.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('is-flex');

    const todoText = document.createElement('h3');
    todoText.textContent = todoInput.value;

    const todoDelete = document.createElement('button');
    todoDelete.textContent = 'X';
    todoDelete.setAttribute('id', 'delete');

    const todoEdit = document.createElement('button');
    todoEdit.textContent = 'Edit';
    todoEdit.setAttribute('id', 'edit');

    todoDiv.appendChild(todoDelete);
    todoDiv.appendChild(todoEdit);
    todoDiv.appendChild(todoText);
    todoContent.appendChild(todoDiv);
    form.reset();

    toDoListNotes.push(todoText.textContent)
    localStorage.setItem("toDoList", JSON.stringify(toDoListNotes));
})


todoContent.addEventListener("click", e => {
    const target = e.target;
    if(target.getAttribute('id') == 'delete'){
        //detele elemnt from localStorage 
        todoContent.removeChild(e.target.parentNode);    
    } 
    if(target.getAttribute('id') == 'edit') editItem(e);
    if(target.getAttribute('id') == 'save') saveContent(e);
    
})

function editItem(event){
    console.log("Edit me")
    const parent = event.target.parentNode;
    const textContent = parent.children[2];
    const editBtn = parent.children[1];

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'save';
    saveBtn.setAttribute('id', 'save');

    const editInput = document.createElement('input');
    editInput.value = textContent.innerText;

    parent.removeChild(editBtn)
    parent.removeChild(textContent);
    parent.appendChild(saveBtn);
    parent.appendChild(editInput);
}

function saveContent(event){
    console.log('Save me');
    const parent = event.target.parentNode;
    const textInput = parent.children[2];
    const saveBtn = parent.children[1];

    const editBtn = document.createElement('button');
    editBtn.textContent = 'edit';
    editBtn.setAttribute('id', 'edit');
    
    const textContent = document.createElement('h3');
    textContent.innerText = textInput.value;

    parent.removeChild(saveBtn)
    parent.removeChild(textInput);
    parent.appendChild(editBtn);
    parent.appendChild(textContent);

    //Modify existing element in localStorage and save
}