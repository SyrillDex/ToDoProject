const tasksList = [{
  name: "Tasks will be displayed here",
  dueDate: "Due date"
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

  const dateDateInput = document.querySelector('.js-duedate-input');
  const dueDate = dateDateInput.value;

  tasksList.push({
    name,
    dueDate
  });
  renderTasksList();  
  inputElement.value = '';
}