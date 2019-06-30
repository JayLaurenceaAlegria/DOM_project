const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load event listeners 

// loadEventListener(); 

// load all event listener

// function loadEventListener(){
    // DOMcontentlod
    document.addEventListener('DOMContentLoaded', getTasks)
    // add task event 
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click', removeTask);
    // clear task event 
    clearBtn.addEventListener('click', clearTasks);
    // filter task 
    filter.addEventListener('keyup',filterTask);
// }; 
function getTasks(){
    let tasks;
if(localStorage.getItem('tasks') === null){
    tasks = [];

} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
} 
tasks.forEach(function(task){
const li = document.createElement('li');
    // create element
li.className = 'collection-item';
// Create text node 
li.appendChild(document.createTextNode(task));
// create link 
const link = document.createElement('a');
link.className = 'delete-item secondary-content'
// add icon 
link.innerHTML = '<i class = "far fa-trash-alt"></i>'
// append 
li.appendChild(link);

// append li to ul 
taskList.appendChild(li);
});
}

function addTask(e){
    if (taskInput.value === ''){
        alert('Fill some text');
    }
    else{
    // create li
    const li = document.createElement('li');
    // create element
li.className = 'collection-item';
// Create text node 
li.appendChild(document.createTextNode(taskInput.value));
// create link 
const link = document.createElement('a');
link.className = 'delete-item secondary-content'
// add icon 
link.innerHTML = '<i class = "far fa-trash-alt"></i>'
// append 
li.appendChild(link);

// append li to ul 
taskList.appendChild(li);


let tasks;
if(localStorage.getItem('tasks') === null){
    tasks = [];

} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
} 

tasks.push(taskInput.value);
localStorage.setItem('tasks',JSON.stringify(tasks));

taskInput.value = '';
};
e.preventDefault();
}

// remove task 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Clear this tasks?')){
            
            e.target.parentElement.parentElement.remove();
            // Remove from LS
            // localStorage.clear();
            removeyou(e.target.parentElement.parentElement);

        }
    }
    e.preventDefault();
}

function removeyou(taskItem){
let tasks;
if (localStorage.getItem('tasks') === null){
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(function(task, index){
if(taskItem.textContent === task){
    tasks.splice(index , 1);
}
});
localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTasks(e){
taskList.innerHTML = '';
clearTasksFromLocalStorage();
// while(taskList.firstChild){
//     taskList.removeChild(taskList.firstChild);
// }
}
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}
