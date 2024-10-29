let tasksList = JSON.parse(localStorage.getItem('tasksList')) || [{
  name: "Eg. Hire an employee",
  dueDate: "Eg. 2024-10-27",
  time: "07:00"
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

  tasksList.forEach((taskObject, index) =>{
    const { name, dueDate, time} = taskObject;
    const html = `
      <div class="tasks">
      <div class="buttons">
        <button class="edit-button">
          Edit
        </button>
        <button class="delete-button">
          Delete
        </button>
      </div>
        <p class="js-task-name">${name}</p>
        <p>${dueDate} </p>
        <p>${time}</p>
      </div>
      `;
    tasksHTML += html;
  });
  document.querySelector('.js-tasks').innerHTML = tasksHTML;

  document.querySelectorAll('.delete-button')
    .forEach((deleteButton, index) =>{
      deleteButton.addEventListener('click', () =>{
        tasksList.splice(index, 1);
        saveTasksToLocalStorage();
        renderTasksList();
      });
    });

  document.querySelectorAll('.edit-button')
    .forEach((editButton,index) =>{
      editButton.addEventListener('click', () =>{
        const item = tasksList[index];
        let inputElement = document.querySelector('.task-input');
        let dateInput = document.querySelector('.js-duedate-input');
        let timeInput = document.querySelector('.js-time-input');
      
        inputElement.value = item.name;
        dateInput.value = item.date;
        timeInput.value = item.time;
        deleteTask(index);
      })
    })

  if(tasksList.length > 0){
    isEmpty = false;
    document.querySelector('.default-tasks').style.display = "none";
  }else{
    isEmpty = true;
    document.querySelector('.default-tasks').style.display = "flex";
  }
}
document.querySelector('.add-button').addEventListener('click', () =>{
  addToInput();
});
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
const inputElement = document.querySelector('.task-input');
inputElement.addEventListener('keydown', (event)=>{
  if(event.key === 'Enter'){
    addToInput();
  }
});
function saveTasksToLocalStorage() {
  localStorage.setItem('tasksList', JSON.stringify(tasksList));
}
function welcomeUser(){
  let welcomeUser = JSON.parse(localStorage.getItem('username')) || "Guest";
  let welcomeHTML = `` ;
  
  const html = `
    <a href="index.html"><i class="fa-solid fa-user-pen"></i></a>
    <h1>Welcome to <em>${welcomeUser}'s</em> To do List</h1>
  `;
  welcomeHTML += html;
  
  document.querySelector('.welcome-mess').innerHTML = welcomeHTML;
}
document.querySelector('.clear-button').addEventListener('click', () =>{
  clearTasks();
})
function clearTasks(){
  localStorage.removeItem('tasksList');
  window.location.reload();
}


