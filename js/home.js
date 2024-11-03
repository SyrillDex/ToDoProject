// create an array named taskList
let tasksList = JSON.parse(localStorage.getItem('tasksList')) || [{ // Get the taskList from local storage
  name: "Eg. Hire an employee",                                     // If the taskList is empty, used this
  dueDate: "Eg. 2024-10-27",                                        // default objects using default opertator
  time: "07:00"
}];


welcomeUser(); // Render the Welcome message
renderTasksList(); // Render the taskList

function renderTasksList(){
  let tasksHTML = `
    <div class="default-tasks">
      No tasks to show  <!--Add this div if the taskList is empty-->
    </div>
  `;

  tasksList.forEach((taskObject) =>{ // Loop through taskList Array
    const { name, dueDate, time} = taskObject; // Set the taskObject variable
    const html = `
      <div class="tasks">
      <div class="buttons">
        <button class="edit-button">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="delete-button">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
        <p class="js-task-name">${name}</p>   <!--Get the object name from array-->
        <p><i class="fa-regular fa-calendar-days"></i> ${dueDate} </p> <!--Get the object dueDate from array-->
        <p><i class="fa-regular fa-clock"></i> ${time}</p> <!--Get the object time from array-->
      </div>
      `;
    tasksHTML += html; // Concatinate taskHTML to html string
  });
  document.querySelector('.js-tasks').innerHTML = tasksHTML; // set the innerHTML of .js-tasks to taskHTML

  document.querySelectorAll('.delete-button') // get all the delete-buttons of the page
    .forEach((deleteButton, index) =>{  // Loop through every button
      deleteButton.addEventListener('click', () =>{ // Add event Listener when button is clicked
        deleteTask(index);
      });
    });

  document.querySelectorAll('.edit-button')
    .forEach((editButton,index) =>{
      editButton.addEventListener('click', () =>{
        const item = tasksList[index]; // accesses the tasksList array using the button’s index
        let inputElement = document.querySelector('.task-input'); // Getting input elements
        let dateInput = document.querySelector('.js-duedate-input');
        let timeInput = document.querySelector('.js-time-input');
      
        inputElement.value = item.name; // Setting input values that corresponds to the value of item clicked
        dateInput.value = item.date;
        timeInput.value = item.time;
        deleteTask(index);
      });
    });

  function deleteTask(index){
    tasksList.splice(index, 1); // Delete an item on the array based on its index
    saveTasksToLocalStorage(); // Save the new array to local storage
    renderTasksList(); // Render the new task List
  }

  if(tasksList.length > 0){ // display .default-task if the array is empty
    document.querySelector('.default-tasks').style.display = "none";
  }else{
    document.querySelector('.default-tasks').style.display = "flex";
  }
}

document.querySelector('.add-button').addEventListener('click', () =>{ // Get the button "Add"
  addToInput();
});
function addToInput(){
  const inputElement = document.querySelector('.task-input'); // Get the task name input
  const name = inputElement.value; // Assign its value to a variable 

  const dateInput = document.querySelector('.js-duedate-input'); // Get the date input
  const dueDate = dateInput.value; // Assign its value to a variable 

  const timeInput = document.querySelector('.js-time-input'); // Get the time input
  const time = timeInput.value; // Assign its value to a variable 

  function pushDataToArray(date,time){ 
    tasksList.push({ // Adds data to the array with parameters date and time
      name,
      dueDate: date,
      time: time
    });
    saveTasksToLocalStorage();
    renderTasksList();  
    inputElement.value = ''; // Clears the content of the input
  }
  if(name === ""){ // Check if the input task name field is empty
    alert("Please input tasks");
  }else if(!dueDate && !time){ // Check if the date and time field is empty
    pushDataToArray("No due date", "No time input"); // Set a value to date and time by passing the parameters
  }
  else if(!dueDate){
    pushDataToArray("No due date", time); // If no duedate, set default duedate and pass time value
  }else if(!time){
    pushDataToArray(dueDate, "No time input"); // If no time, set default time and pass dueDate value
  }
  else{
    pushDataToArray(dueDate,time); // If both have value, pass the values set by the user
  }
}
const inputElement = document.querySelector('.task-input'); // get the input element
inputElement.addEventListener('keydown', (event)=>{
  if(event.key === 'Enter'){ // if user pressed Enter then add the username to local storage
    addToInput();
  }
});
function saveTasksToLocalStorage() {
    //Stringify the taskList array and add it to localStorage
  localStorage.setItem('tasksList', JSON.stringify(tasksList)); 
}
function welcomeUser(){
   // Get the username item from storage, the default is guest if no user input
  let welcomeUser = localStorage.getItem('username') || "Guest";
  let welcomeHTML = `` ; 
  
  const html = `
    <a href="index.html"><i class="fa-solid fa-user-pen"></i></a>
    <h1>Welcome to <em>${welcomeUser}'s</em> To do List</h1> <!--Get the username using variable-->
  `;
  welcomeHTML += html; // Concatinate welcome string to html
  
  document.querySelector('.welcome-mess').innerHTML = welcomeHTML;
}
document.querySelector('.clear-button').addEventListener('click', () =>{
  clearTasks();
})
function clearTasks(){
  localStorage.removeItem('tasksList'); // Removes taskList item from the localStorage
  window.location.reload();
}