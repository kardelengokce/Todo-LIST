const form = document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList= document.querySelector(".list-group");
const firstCardBody= document.querySelectorAll(".card-body")[0];
const secondCardBody= document.querySelectorAll(".card-body")[1];
const filter= document.querySelector("#filter");
const clearButton =document.querySelector("#clear-todos");

eventLİstener();

function eventLİstener(){
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",loadAllTodosUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTdos);
    clearButton.addEventListener("click",clearAllTodos);
}


function addTodo(e){
    const newTodo=todoInput.value.trim();
    if(newTodo == ""){

    }
     else {
       addTodoToUI(newTodo);
       addTodosFromStorage(newTodo);
    }

//    console.log(newTodo)
  

   e.preventDefault();
}

function addTodoToUI(newTodo){
//      <li class="list-group-item d-flex justify-content-between">
//     Todo 1
//     <a href = "#" class ="delete-item">
//         <i class = "fa fa-remove"></i>
//     </a>
// </li> 


const listItem= document.createElement("li");
listItem.className="list-group-item d-flex justify-content-between";


const link=document.createElement("a");
link.className="delete-item";
link.href="#";
link.innerHTML=' <i class = "fa fa-remove"></i>';


listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);
todoList.appendChild(listItem);
}

todoInput.value="";

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")=== null){
         todos=[];
     }
     else{
        todos=JSON.parse(localStorage.getItem("todos"))
     }
     return todos;
}

function addTodosFromStorage(newTodo){
    let todos=getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function loadAllTodosUI(){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);

    })
}

function deleteTodo(e){
    if(e.target.className=== "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
    }
      console.log(e.target);
    deleteTodoStorage( e.target.parentElement.parentElement.textContent);

}
function deleteTodoStorage(deleteTodo){
    let todos=getTodosFromStorage();
    todos.forEach(function (todo,index){
        if(todo=== deleteTodo){
             todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function filterTdos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItem=document.querySelectorAll(".list-group-item");
    listItem.forEach(function(listItem){
        const text=listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue)==false){
            listItem.setAttribute("style","display:none !important;")
        }
        else{
            listItem.setAttribute("style","display:block  !important;")
        }

    })
}

function clearAllTodos(e){
    if(confirm("silmek istediğnize emin misiniz?")){
         console.log(todoList.firstElementChild);
         while(todoList.firstElementChild=!null){
            todoList.removeChild(todoList.firstElementChild);
         }
         localStorage.removeItem("todos");
    }
    
    
}