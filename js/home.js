let tasksList = JSON.parse(localStorage.getItem('tasksList')) || [{
  name: "Eg. Hire an employee",
  dueDate: "Eg. 2024-10-27",
  time: "00:00"
}];

welcomeUser();
renderTasksList();

function renderTasksList(){
  let tasksHTML = `
    <div class="default-tasks">
      No tasks to show
    </div>
  `;
  let isEmpty = true;

  for(let i = 0; i < tasksList.length; i++){
    const taskObject = tasksList[i];
    const { name, dueDate, time} = taskObject;
    const html = `
      <div class="buttons">
        <button onclick="editTask(${i})" class="edit-button">
          Edit
        </button>
        <button onclick="deleteTask(${i})" class="delete-button">
          Delete
        </button>
      </div>
      <div class="tasks">
        <p>${name}</p>
        <p>${dueDate} </p>
        <p>${time}</p>
      </div>
      `;
    tasksHTML += html;
  }
  document.querySelector('.js-tasks').innerHTML = tasksHTML;

  if(tasksList.length > 0){
    isEmpty = false;
    document.querySelector('.default-tasks').style.display = "none";
  }else{
    isEmpty = true;
    document.querySelector('.default-tasks').style.display = "flex";
  }
}
function addToInput(){
  const inputElement = document.querySelector('.task-input');
  const name = inputElement.value;

  const dateInput = document.querySelector('.js-duedate-input');
  const dueDate = dateInput.value;

  const timeInput = document.querySelector('.js-time-input');
  const time = timeInput.value;

  function pushDataToArray(date,time){
    tasksList.push({
      name,
      dueDate: date,
      time: time
    });
    saveTasksToLocalStorage();
    renderTasksList();  
    inputElement.value = '';
  }
  if(name === ""){
    alert("Please input tasks");
  }else if(!dueDate && !time){
    pushDataToArray("No due date", "No time input");
  }
  else if(!dueDate){
    pushDataToArray("No due date", time);
  }else if(!time){
    pushDataToArray(dueDate, "No time input");
  }
  else{
    pushDataToArray(dueDate,time);
  }
}
function saveTasksToLocalStorage() {
  localStorage.setItem('tasksList', JSON.stringify(tasksList));
}
function deleteTask(index){
  tasksList.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasksList();
}
function editTask(index){
  const item = tasksList[index];
  let inputElement = document.querySelector('.task-input');
  let dateInput = document.querySelector('.js-duedate-input');
  let timeInput = document.querySelector('.js-time-input');

  inputElement.value = item.name;
  dateInput.value = item.date;
  timeInput.value = item.time;
  deleteTask(index);
}
function welcomeUser(){
  let welcomeUser = JSON.parse(localStorage.getItem('username')) || "Guest";
  let welcomeHTML = `<a href="index.html">Edit username</a>` ;
  
  const html = `
    <h1>Welcome to ${welcomeUser}'s To do List</h1>
  `;
  welcomeHTML += html;
  
  document.querySelector('.welcome-mess').innerHTML = welcomeHTML;
}


