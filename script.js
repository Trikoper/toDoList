class ToDoApp{
    constructor(){
        this.form = document.querySelector('form'); //astfel se va vedea in metode
        this.todoInput = document.querySelector('#todo-input');
        this.todoContent = document.querySelector('#todo-content');
        this.toDoListNotes= []

        this.bindEvents()
    }

    loadInitialData(){

    }

    bindEvents(){
        this.form.addEventListener('submit', e => this.onSubmit(e))
        this.todoContent.addEventListener('click', e => this.onClick(e))
    }
    
    createToDoElement(id, text){

    }

    save(){

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
        console.log("All good")
    }
    
    saveItem(e){ //saveTodo
        console.log("All good too")
    }
}

new ToDoApp()