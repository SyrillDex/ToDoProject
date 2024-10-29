function addUsername(){
  const usernameInput = document.querySelector('.username');
  const username = usernameInput.value;

  localStorage.setItem('username', JSON.stringify(username));
  usernameInput.value = "";
  window.location.href = "home.html"
}

const usernameInput = document.querySelector('.username');
usernameInput.addEventListener('keydown', (event)=>{
  if(event.key === 'Enter'){
    addUsername();
  }
});