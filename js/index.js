function addUsername(){
  const usernameInput = document.querySelector('.username'); // Get the username input by classname
  const username = usernameInput.value; // Assigning the value of usernameInput to username

  localStorage.setItem('username', username); // Set item username to local storage named 'username'
  usernameInput.value = ""; // Clears the value of the input field
  window.location.href = "home.html" // Load the page home.html
}

const usernameInput = document.querySelector('.username'); // Get the username input by classname
usernameInput.addEventListener('keydown', (event)=>{ //adds event listener to usernameinput 
  if(event.key === 'Enter'){  //if user pressed Enter then add the username to local storage
    addUsername();
  }
});