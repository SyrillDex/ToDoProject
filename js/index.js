let tasksList = JSON.parse(localStorage.getItem('tasksList')) || [{
  name: "Eg. Hire an employee",
  dueDate: "Eg. 2024-10-27",
  time: "00:00"
}];

renderTasksList();

function renderTasksList(){
  let tasksHTML = "";
  let isEmpty = true;

  for(let i = 0; i < tasksList.length; i++){
    const taskObject = tasksList[i];
    const { name, dueDate, time} = taskObject;
    const html = `
      <p>
        ${name} ${dueDate} ${time}
        <button onclick="
          tasksList.splice(${i}, 1);
          saveTasksToLocalStorage();
          renderTasksList();
        ">Delete</button>
      </p>
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