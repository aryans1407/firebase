const database = firebase.database().ref();

const allMessages = document.querySelector('#all-messages');
const usernameElem = document.getElementById('username');
const messageElem = document.getElementById('message');
const emailElement = document.getElementById("email");
const sendBtn = document.getElementById('send-btn');

sendBtn.onclick = updateDB;
// sendBtn.addEventListener('click', updateDB);

function updateDB(event) {
  // Prevent default refresh
  event.preventDefault();
  // Create data object
  const data = {
    USERNAME: usernameElem.value,
    EMAIL: emailElement.value,
    PROFILE: imageInput.value,
    MESSAGE: messageElem.value,
  };
  // console.log the object
  console.log(data);
  // GET *PUSH* PUT DELETE
  // Write to our database
  database.push(data);
  // Reset message
  messageElem.value = '';
}

database.on('child_added', addMessageToBoard);


function addMessageToBoard(rowData) {
  // Store the value of rowData inside object named 'data'
  const data = rowData.val();
  // console.log data
  console.log(data);
  // Create a variable named singleMessage
  // that stores function call for makeSingleMessageHTML()
  let singleMessage = makeSingleMessageHTML(data.USERNAME, data.EMAIL, data.MESSAGE, data.PROFILE);
  // Append the new message HTML element to allMessages
  allMessages.append(singleMessage);
}

function makeSingleMessageHTML(usernameTxt, emailTxt, messageTxt, profileTxt) {
  // Create Parent Div
  let parentDiv = document.createElement('div');
  // Add Class name .single-message
  parentDiv.className = 'single-message';
  // parentDiv.classList.add('single-message');

  let profilePic = document.createElement("img");
  profilePic.className = "single-message-img";
  profilePic.src = profileTxt;
  parentDiv.appendChild(profilePic);

  // Create Username P Tag
  let usernameP = document.createElement('p');
  usernameP.className = 'single-message-username';
  usernameP.innerHTML = usernameTxt + ':';
  
  // Append username
  parentDiv.appendChild(usernameP);

  //Email + Append
  let emailP = document.createElement("p");
  emailP.innerHTML = emailTxt;
  parentDiv.append(emailP);

  // Create message P Tag
  let messageP = document.createElement('p');
  messageP.innerHTML = messageTxt;
  
  // Append message
  parentDiv.append(messageP);

  //Date
  const date = new Date();
  dateTxt = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  let dateP = document.createElement('p');
  dateP.className = "single-message-date";
  dateP.innerHTML = dateTxt;
  parentDiv.append(dateP);

  timeTxt = date.getHours() + ":" + date.getMinutes() + ":" + date.getMinutes();
  let timeP = document.createElement("p");
  timeP.className = "single-message-time";
  timeP.innerHTML = timeTxt;
  parentDiv.append(timeP);
  
  // Return Parent Div
  return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */