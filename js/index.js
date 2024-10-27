const tasksList = [];

renderTasksList();

function renderTasksList(){
  let tasksHTML = "";

  for(let i = 0; i < tasksList.length; i++){
    const task = tasksList[i];
    const html = `<p>${task}</p>`;
    tasksHTML += html;
  }
  document.querySelector('.js-tasks').innerHTML = tasksHTML;
}
function addToInput(){
  const inputElement = document.querySelector('.task-input');
  const taskName = inputElement.value;

  tasksList.push(taskName);
  renderTasksList();  
  inputElement.value = '';
}