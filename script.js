class ToDoApp{
    constructor(){
        this.form = document.querySelector('form'); //astfel se va vedea in metode
        this.todoInput = document.querySelector('#todo-input');
        this.todoContent = document.querySelector('#todo-content');
        this.toDoListNotes= []

        this.loadInitialData()
        this.bindEvents()
    }

    loadInitialData(){
        let testList = localStorage.getItem("toDoList");
        if (testList !== null){
            this.toDoListNotes = JSON.parse(testList);
            this.toDoListNotes.forEach(note => {
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
                this.todoContent.appendChild(todoDiv);
        })
    }
    else this.toDoListNotes = [];
    }

    bindEvents(){
        this.form.addEventListener('submit', e => this.onSubmit(e))
        this.todoContent.addEventListener('click', e => this.onClick(e))
    }
    
    createToDoElement(id, text){

    }

    save(){ //save

    }

    onSubmit(e){
        e.preventDefault();
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('is-flex');
        const todoText = document.createElement('h3');
        todoText.textContent = this.todoInput.value;

        const todoDelete = document.createElement('button');
        todoDelete.textContent = 'X';
        todoDelete.setAttribute('id', 'delete');

        const todoEdit = document.createElement('button');
        todoEdit.textContent = 'Edit';
        todoEdit.setAttribute('id', 'edit');

        todoDiv.appendChild(todoDelete);
        todoDiv.appendChild(todoEdit);
        todoDiv.appendChild(todoText);
        this.todoContent.appendChild(todoDiv);
        this.form.reset();

        this.toDoListNotes.push(todoText.textContent);
        localStorage.setItem("toDoList", JSON.stringify(this.toDoListNotes));
    }

    onClick(e){
        const target = e.target;
        if(target.getAttribute('id') == 'delete'){
            const parent = e.target.parentNode;
            const text = parent.children[2].innerText;
            this.toDoListNotes = this.toDoListNotes.filter(note => note !== text);
            localStorage.setItem("toDoList", JSON.stringify(this.toDoListNotes));
            this.todoContent.removeChild(parent);    
        } 
        if(target.getAttribute('id') == 'edit') this.editItem(e);
        if(target.getAttribute('id') == 'save') this.saveContent(e);
    }

    deleteToDo(e){

    }
    
    editItem(e){ //editTodo
        console.log("Editing right now")
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
    
    saveContent(e){ //saveTodo
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

        const index = this.toDoListNotes.indexOf(oldNote);
        this.toDoListNotes[index] = textContent.innerText;
        localStorage.setItem("toDoList", JSON.stringify(this.toDoListNotes));
    }
}

new ToDoApp()