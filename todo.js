//adding tasks
//removing task
//filtering task
//fetching motivational quotes


const addTaskInput = document.getElementById('add-task');
const sumbitButton = document.getElementById('submit-button');
const taskList = document.getElementById('list-of-tasks');
const clearAllButton = document.getElementById('clear-all');

const api = document.getElementById('api-fetch');

function fetchMotivationalQuotes(){
    fetch('https://qapi.vercel.app/api/random')
        .then(response =>{
            if(!response.ok){
                throw new Error("Failed to fetch quote");
            }
            return response.json();
        })
        .then(data=>{
            api.textContent = `"${data.quote}" - ${data.author}`;
        })
        .catch(error =>{
            api.textContent = "Failed to load a quote.";
            console.error("Error fetching quote:", error);
        })
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//add task
function addTask(){
    let taskText = addTaskInput.value.trim();

    if(taskText){
        tasks.push({text: taskText, completed: false});
        addTaskInput.value = "";
        updateTaskList();
        saveTasks();
    }
}

function updateTaskList(){
        taskList.innerHTML = "";
        tasks.forEach((task, index)=>{
            const li = document.createElement('li');
            li.classList.add("flex","items-center", "justify-between", "mb-2");

            const tickIcon = document.createElement('i');
            tickIcon.classList.add("fas", "fa-check-circle", "text-gray-400", "hover:text-green-500", "cursor-pointer", "text-lg", "mr-2");
            tickIcon.style.marginRight = "1rem"
            tickIcon.addEventListener('click', ()=>toggleTaskCompletion(tickIcon, taskText, deleteIcon));

            //create task text
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.classList.add("truncate", "w-full");

            li.appendChild(tickIcon);
            li.appendChild(taskText);
          
            const deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fas", "fa-trash", "text-gray-500", "hover:text-red-600", "cursor-pointer", "text-lg")
            deleteIcon.addEventListener("click", ()=>removeTask(index));
            
            li.appendChild(deleteIcon);

            taskList.appendChild(li);
        })
}

function toggleTaskCompletion(tickIcon, taskText, deleteIcon){

    if (taskText.style.textDecoration === "line-through") {
        taskText.style.textDecoration = "none";
        taskText.style.color = "";
        tickIcon.classList.replace("text-gray-500", "text-gray-400");
        tickIcon.style.opacity = "1";
        deleteIcon.classList.replace("text-gray-300", "text-gray-500");
        deleteIcon.style.opacity = "1";
    } else {
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "gray";
        tickIcon.classList.replace("text-gray-400", "text-gray-500");
        tickIcon.style.opacity = "0.5";
        deleteIcon.classList.replace("text-gray-500", "text-gray-300");
        deleteIcon.style.opacity = "0.5";
    }
    }
    updateTaskList();
    saveTasks();

function removeTask(index){
    tasks.splice(index, 1);
    updateTaskList();
    saveTasks();
}

function clearAllTasks(){
    tasks = [];
    updateTaskList();
    saveTasks();
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

sumbitButton.addEventListener("click", addTask);

updateTaskList();
fetchMotivationalQuotes();

console.log(document.getElementById("api-fetch")); // Should not be null

document.getElementById("theme1-circle").addEventListener('click', ()=>{
    document.body.classList.remove("theme2");
    document.body.classList.add("theme1");
});

document.getElementById("theme2-circle").addEventListener('click', ()=>{
    document.body.classList.remove("theme1");
    document.body.classList.add("theme2");
})

// function setTheme(theme){
//     document.documentElement.className = theme;
//     console.log("Class set on html:", document.documentElement.className);
// }