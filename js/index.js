const tasksList = [{
  name: "Eg. Hire an employee",
  dueDate: "Eg. 2024-10-27"
}];

renderTasksList();

function renderTasksList(){
  let tasksHTML = "";

  for(let i = 0; i < tasksList.length; i++){
    const taskObject = tasksList[i];
    const { name, dueDate} = taskObject;
    const html = `
      <p>
        ${name} ${dueDate}
        <button onclick="
          tasksList.splice(${i}, 1); 
          renderTasksList();
        ">Delete</button>
      </p>
      `;
    tasksHTML += html;
  }
  document.querySelector('.js-tasks').innerHTML = tasksHTML;
}
function addToInput(){
  const inputElement = document.querySelector('.task-input');
  const name = inputElement.value;

  const dateInput = document.querySelector('.js-duedate-input');
  const dueDate = dateInput.value;

  function pushDataToArray(date){
    tasksList.push({
      name,
      dueDate: date
    });
    renderTasksList();  
    inputElement.value = '';
  }

  if(name === ""){
    alert("No name");
  }else if(!dueDate){
    pushDataToArray("No due date");
  }else{
    pushDataToArray(dueDate);
  }
}