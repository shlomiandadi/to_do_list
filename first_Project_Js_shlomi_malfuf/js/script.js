// Setting Variables Globals
const inputBox = document.querySelector(".AllInput input");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".allTask button");
const STORAGE_KEY_TODOS = 'todos';

// A function that checks if the user has filled in the required fields,
//  can open a task by clicking the plus button.
function validateAllElements(){
  if(inputBox.value.trim().length>0 && date.checkValidity() && time.checkValidity()) { 
    addBtn.classList.add("active"); 
  }else{
    addBtn.classList.remove("active");
  }
};

inputBox.addEventListener('keydown', validateAllElements);
date.addEventListener('change', validateAllElements);
time.addEventListener('change', validateAllElements);

// Field clear button
clearBtn.addEventListener('click', ()=>{
  inputBox.value = '';
  date.value = '';
  time.value = '';
   validateAllElements();
});
showTasks();

//user click on plus icon button and get localstorage and valid localstorage has no data.
addBtn.addEventListener('click', ()=>{
  let userEnteredValue = inputBox.value; 
  let dateEnteredValue = date.value; 
  let timeEnteredValue = time.value; 
  let getLocalStorageData = localStorage.getItem(STORAGE_KEY_TODOS); 
  if(getLocalStorageData == null){ 
    listArray = []; 
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  };

  const newTask = {
    task:userEnteredValue,
    date:dateEnteredValue,
    time:timeEnteredValue
  };
  listArray.push(newTask);
   localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(listArray)); 
  showTasks();

  //unactive the add button once the task added.
  addBtn.classList.remove("active");
});

// The task view function pulls the information from localStorage And presents it in the element li .
function showTasks(){
  let getLocalStorageData = localStorage.getItem(STORAGE_KEY_TODOS);
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  };

  //if array length is greater than 0 add or remove
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  };

  let newLiTag = "";
  listArray.forEach((taskObj, index) => {
    newLiTag += `<li class="col-lg-12 col-md-12 col-sm-12 text-white bg-dark fw-bolder">
      Task: ${taskObj.task}<br/>Date: ${taskObj.date} <br/>
      Time: ${taskObj.time}
      <span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span>
    </li>`;
  });

  //adding new li tag inside ul tag and once task added leave the input field blank 
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
  date.value = "";
  time.value = "";
};

// delete task function and delete or remove the li and call function showTasks.
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem(STORAGE_KEY_TODOS);
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(listArray));
  showTasks(); 
};

// delete all tasks function and set the item in localstorage and call function showTasks.
deleteAllBtn.addEventListener('click', ()=>{
  localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify([])); 
  showTasks(); 
});