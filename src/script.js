// ****** DECLARATIONS ********
const body = document.getElementById('body');
const toggleBtn = document.getElementById('theme-toggle');

// Form Elements
const form = document.getElementById('form');
const input = document.getElementById('todoInput');
const checkboxVal = document.getElementById('reminder');
const calendarVal = document.getElementById('deadline'); 

// Elements to hold the todo metric count 
const ongoingCount = document.getElementById('ongoing-count');
const completedCount = document.getElementById('completed-count');

// SVGs
const completedSVG = document.querySelector('.card.completed svg circle');
const ongoingSVG = document.querySelector('.card.ongoing svg circle');


// Todo List
const todoList = document.getElementById('todo-list');
let todos = document.querySelectorAll('.todo');

//Nav Buttons
const completedBtn = document.getElementById('completed-btn');
const ongoingBtn = document.getElementById('ongoing-btn');
const allBtn = document.getElementById('all-btn');

// ******* END OF DECLARATIONS *******







// ******** Event Listeners ********
todoList.addEventListener('click', deleteAndCheck);
completedBtn.addEventListener('click', filter);
ongoingBtn.addEventListener('click', filter);
allBtn.addEventListener('click', filter);

// ******** END OF Event Listeners *********







// ******** HELPER FUNCTIONS *********

// Updates the metrics

function updateMetric(){
    const todos = document.querySelectorAll('.todo').length;
    const total = document.getElementById('total');

    if (todos == 0)
    {
        total.classList.add('empty');
        total.innerHTML = 'What are you doing today?'


        // Set SVGs to full circle
        ongoingSVG.style.strokeDashoffset = 0;
        completedSVG.style.strokeDashoffset = 0;

        // Set the counts to Zero
        completedCount.innerHTML = '0%';
        ongoingCount.innerHTML = '0%';
    }
    else if (todos == 1)
    {
        total.classList.remove('empty');
        total.innerHTML = todos + ' Total Task';

        calculatePercentage();
    }
    else
    {
        total.classList.remove('empty');
        total.innerHTML = todos + ' Total Tasks';

        calculatePercentage();
    }
}

// Calculate SVG percentages
function calculatePercentage()
{
    const todos = document.querySelectorAll('.todo').length;
    const completedTasks = document.querySelectorAll('.todo-list .completed').length;

    
    // Percentage of completed tasks round up
    let completedPercent = completedTasks / todos * 100;
    completedSVG.style.strokeDashoffset = (todos - completedTasks) / todos * 310;
    
    // Percentage of ongoing tasks round down
    let ongoingPercent = (todos - completedTasks) / todos * 100;
    ongoingSVG.style.strokeDashoffset = completedTasks / todos * 310;
    
    if (todos != 0){
        completedCount.innerHTML = `${Math.ceil(completedPercent)}%`;
        ongoingCount.innerHTML = `${Math.floor(ongoingPercent)}%`;
    }
}

// Mark a task completed
function deleteAndCheck(e){
    let btn = e.target;
    let parent = btn.parentElement;

    if (btn.classList.contains('check-btn'))
    {
        parent.classList.toggle('completed');
        updateMetric();
    }
    else if (btn.classList.contains('delete'))
    {
        parent.classList.add('animate');
        parent.addEventListener('transitionend', ()=> {
            parent.remove();
            updateMetric();
        })
    }
    else
    {
        return
    }
}


// Filters todos based on progress status
function filter(e){
    let child = e.target.childNodes[3].innerHTML;

    todos = document.querySelectorAll('.todo')
    
    todos.forEach(todo =>{
        switch(child) {
            case 'My tasks':
                todo.style.display = 'flex';
                break;
            case 'Scheduled':
                if(!todo.classList.contains('completed'))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none';
                break;
            case 'Completed':
                if(todo.classList.contains('completed'))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none';
                break;
        }
    })

}

// ***** END OF HELPER FUNCTIONS *******




// ******* FEATURES AND TODO CREATION *****

// Theme Functionality
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
})

// Set default deadline to today
calendarVal.valueAsDate = new Date();


// FORM Events and Todo creation
updateMetric();
form.addEventListener('submit', createTodo);

// Create todo on form submit
function createTodo(e){
    e.preventDefault();

    if (input.value == '' || input.value.trim() == '')
        return
    
    // Creation of HTML elements
    const div = document.createElement('div');
    const todoDeets = document.createElement('div');
    const dateCheck = document.createElement('div');
    const task = document.createElement('p');
    const date = document.createElement('p');
    const clock = document.createElement('i');
    const deleteBtn = document.createElement('button');
    const checkBtn = document.createElement('button');

    // Assigning classNames
    div.classList.add('todo');
    div.setAttribute('draggable', 'true');
    todoDeets.classList.add('todo-deets')
    task.classList.add('task');
    task.setAttribute('contenteditable', '');
    dateCheck.classList.add('date-check')
    date.classList.add('date');
    clock.className = 'fas fa-stopwatch';
    checkBtn.classList.add('check-btn');
    deleteBtn.classList.add('delete');


    // Add Input to the P element
    date.textContent = calendarVal.value;
    task.textContent = input.value;

    // Add Icon to buttons
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

    // Append innner elements to the todo 
    todoDeets.appendChild(task);
    todoDeets.appendChild(dateCheck);
    dateCheck.appendChild(date);

    if (checkboxVal.checked)
        dateCheck.appendChild(clock);
    
    div.appendChild(todoDeets)
    div.appendChild(checkBtn);
    div.appendChild(deleteBtn);

    // Add the todo to the list
    todoList.appendChild(div);
    input.value = '';
    checkboxVal.checked = false;

    updateMetric();
    todos = document.querySelectorAll('.todo');
}

// Drag and Drop functionality