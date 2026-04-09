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
        const parent = e.target.parentNode;
        const text = parent.children[2].innerText;
        toDoListNotes = toDoListNotes.filter(note => note !== text);
        localStorage.setItem("toDoList", JSON.stringify(toDoListNotes));
        todoContent.removeChild(parent);    
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
    parent.setAttribute('oldNote', textContent.innerText)

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
    const oldNote = parent.getAttribute('oldNote');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.setAttribute('id', 'edit');
    
    const textContent = document.createElement('h3');
    textContent.innerText = textInput.value;

    parent.removeChild(saveBtn)
    parent.removeChild(textInput);
    parent.appendChild(editBtn);
    parent.appendChild(textContent);

    const index = toDoListNotes.indexOf(oldNote);
    toDoListNotes[index] = textContent.innerText;
    localStorage.setItem("toDoList", JSON.stringify(toDoListNotes));
    
}

//Ideas for future:
//If a note is opened for edit it will close and save any other note that is being edited (branch needed)
//Ability to move a note around the list using 2 button up and down (will open a branch)
//Can save by hittin Enter
//Add a creation date at the end of note

//Issues:
//OldNote id stays there