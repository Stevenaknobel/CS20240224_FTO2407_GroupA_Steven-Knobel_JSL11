// TASK: import helper functions from utils
// TASK: import initialData
import { getTasks, createNewTask, patchTask, putTask, deleteTask } from "./utils/taskFunctions.js";
import { initialData } from "./initialData.js";

/*************************************************************************************************************************************************
 * FIX BUGS!!!
 * **********************************************************************************************************************************************/

// Function checks if local storage already has data, if not it loads initialData to localStorage
function initializeData() {
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(initialData));
    localStorage.setItem('showSideBar', 'true')
  } else {
    console.log('Data already exists in localStorage');
  }
}

initializeData();

// TASK: Get elements from the DOM
const elements = {
  // Navigation Sidebar
  headerBoardName: document.getElementById('header-board-name'),
  sideBar: document.querySelector('.side-bar'),
  sideBarDiv: document.getElementById('side-bar-div'),
  hideSideBarBtn: document.getElementById('hide-side-bar-btn'),
  showSideBarBtn: document.getElementById('show-side-bar-btn'),
  sideLogoDiv: document.getElementById('logo'),
  themeSwitch: document.getElementById('switch'),
  boardsNavLinksDiv: document.getElementById('boards-nav-links-div'),

  // Primary layout (header, add task button)
  header: document.getElementById('header'),
  addNewTaskBtn: document.getElementById('add-new-task-btn'),
  deleteBoardBtn: document.getElementById('delete-board-btn'),
  dropdownBtn: document.getElementById('dropdownBtn'),
  editBoardBtn: document.getElementById('edit-board-btn'),

  // Primary layout (main area for task columns)
  columnDivs: document.querySelectorAll('.column-div'), // document.getElementsByClassName('column-div'),
  tasksContainer: document.querySelector('.tasks-container'),

  // New task modal(form for adding a new task)
  modalWindow: document.getElementById('new-task-modal-window'),
  descInput: document.getElementById('desc-input'),
  titleInput: document.getElementById('title-input'),
  selectStatus: document.getElementById('select-status'),
  cancelAddTaskBtn: document.getElementById('cancel-add-task-btn'),
  createNewTaskBtn: document.getElementById('add-new-task-btn'),

  // Edit task modal(form for editing an existing task's details)
  cancelEditBtn: document.getElementById('cancel-edit-btn'),
  deleteTaskBtn: document.getElementById('delete-task-btn'),
  editTaskDescInput: document.getElementById('edit-task-desc-input'),
  editTaskTitleInput: document.getElementById('edit-task-title-input'),
  editSelectStatus: document.getElementById('edit-select-status'),
  editTaskForm: document.getElementById('edit-task-form'),
  editTaskModal: document.querySelector('.edit-task-modal-window'),

  // Filter div
  filterDiv: document.getElementById('filterDiv'),
}

let activeBoard = ""

// Extracts unique board names from tasks
// TASK: FIX BUGS
function fetchAndDisplayBoardsAndTasks() {
  const tasks = getTasks();
  console.log(tasks)
  const boards = [...new Set(tasks.map(task => task.board).filter(Boolean))];
  displayBoards(boards);
  if (boards.length > 0) {
    const localStorageBoard = JSON.parse(localStorage.getItem("activeBoard"))
    // Replaced the semi-colon with a colon
    activeBoard = localStorageBoard ? localStorageBoard : boards[0];
    elements.headerBoardName.textContent = activeBoard
    styleActiveBoard(activeBoard)
    refreshTasksUI();
  }
}

// Creates different boards in the DOM
// TASK: Fix Bugs
function displayBoards(boards) {
  const boardsContainer = document.getElementById("boards-nav-links-div");
  boardsContainer.innerHTML = ''; // Clears the container
  boards.forEach(board => {
    const boardElement = document.createElement("button");
    boardElement.textContent = board;
    boardElement.classList.add("board-btn");
    boardElement.addEventListener('click', () => {  // Added eventlistener to fix click event 
      elements.headerBoardName.textContent = board;
      filterAndDisplayTasksByBoard(board);
      activeBoard = board //assigns active board
      localStorage.setItem("activeBoard", JSON.stringify(activeBoard))
      styleActiveBoard(activeBoard)
    });
    boardsContainer.appendChild(boardElement);
  });

}

const columnTitles = {
  todo: 'TODO',
  doing: 'DOING',
  done: 'DONE',
}

// Filters tasks corresponding to the board name and displays them on the DOM.
// TASK: Fix Bugs
function filterAndDisplayTasksByBoard(boardName) {
  const tasks = getTasks(); // Fetch tasks from a simulated local storage function
  const filteredTasks = tasks.filter(task => task.board === boardName); // Used the equality operator '===' for comparison

  // Ensure the column titles are set outside of this function or correctly initialized before this function runs
  elements.columnDivs.forEach(column => {
    const status = column.getAttribute("data-status");
    // Reset column content while preserving the column title
    const columnTitle = columnTitles[status];
    column.innerHTML = `<div class="column-head-div">
                          <span class="dot" id="${status}-dot"></span>
                          <h4 class="columnHeader">${status.toUpperCase()}</h4>
                        </div>`;

    const tasksContainer = document.createElement("div");
    column.appendChild(tasksContainer);

    filteredTasks.filter(task => task.status === status).forEach(task => { // Used the equality operator '===' for comparison
      const taskElement = document.createElement("div");
      taskElement.classList.add("task-div");
      taskElement.textContent = task.title;
      taskElement.setAttribute('data-task-id', task.id);

      // Listen for a click event on each task and open a modal
      taskElement.addEventListener('click', () => { // Added an event listener 
        openEditTaskModal(task);
      });

      tasksContainer.appendChild(taskElement);
    });
  });
}


function refreshTasksUI() {
  filterAndDisplayTasksByBoard(activeBoard);
}

// Styles the active board by adding an active class
// TASK: Fix Bugs
function styleActiveBoard(boardName) {
  document.querySelectorAll('.board-btn').forEach(btn => {

    if (btn.textContent === boardName) {
      // Added the 'classList' method
      btn.classList.add('active');
    }
    else {
      // Added the 'classList' method
      btn.classList.remove('active');
    }
  });
}


function addTaskToUI(task) {
  const column = document.querySelector('.column-div[data-status="${task.status}"]');
  if (!column) {
    console.error(`Column not found for status: ${task.status}`);
    return;
  }

  let tasksContainer = column.querySelector('.tasks-container');
  if (!tasksContainer) {
    console.warn(`Tasks container not found for status: ${task.status}, creating one.`);
    tasksContainer = document.createElement('div');
    tasksContainer.className = 'tasks-container';
    column.appendChild(tasksContainer);
  }

  const taskElement = document.createElement('div');
  taskElement.className = 'task-div';
  taskElement.textContent = task.title; // Modify as needed
  taskElement.setAttribute('data-task-id', task.id);

  tasksContainer.appendChild(taskElement); // Appended taskElement to tasksContainer, to ensure that the newly created task is visually added to the appropriate section of the UI, making it visible to the user
}


function setupEventListeners() {
  // Cancel editing task event listener
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  cancelEditBtn.addEventListener('click', () => toggleModal(false, elements.editTaskModal));

  // Cancel adding new task event listener
  const cancelAddTaskBtn = document.getElementById('cancel-add-task-btn');
  cancelAddTaskBtn.addEventListener('click', () => {
    toggleModal(false);
    elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
  });

  // Clicking outside the modal to close it
  elements.filterDiv.addEventListener('click', () => {
    toggleModal(false);
    elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
  });

  // Show sidebar event listener
  elements.hideSideBarBtn.addEventListener('click', () => toggleSidebar(false));
  elements.showSideBarBtn.addEventListener('click', () => toggleSidebar(true));

  // Theme switch event listener
  elements.themeSwitch.addEventListener('change', toggleTheme);

  // Show Add New Task Modal event listener
  elements.createNewTaskBtn.addEventListener('click', () => {
    toggleModal(true);
    elements.filterDiv.style.display = 'block'; // Also show the filter overlay
  });

  // Add new task form submission event listener
  elements.modalWindow.addEventListener('submit', (event) => {
    addTask(event)
  });
}

// Toggles tasks modal
// Task: Fix bugs
function toggleModal(show, modal = elements.modalWindow) {
  // Corrected ternary operator syntax
  modal.style.display = show ? 'block' : 'none';
}

/*************************************************************************************************************************************************
 * COMPLETE FUNCTION CODE
 * **********************************************************************************************************************************************/

function addTask(event) {
  event.preventDefault();

  //Assign user input to the task object
  const task_id = JSON.parse(localStorage.getItem('id')); // Retrieves value from browser's local storage
  const titleInput = elements.titleInput.value; // Captures value entered in an input field, such as a task title.
  const descInput = elements.descInput.value; // Captures value entered in a textarea field, such as a task description.
  const selectStatus = elements.selectStatus.value; // Captures selected value from a dropdown list, indicating the status or category of the task

  // 'task' object to store info such as title, description, etc. 
  const task = {
    title: document.getElementById('title-input').value,
    desc: document.getElementById('desc-input').value,
    status: document.getElementById('select-status').value,
    board: activeBoard,
  };

  const newTask = createNewTask(task);
  if (newTask) {
    addTaskToUI(newTask);
    toggleModal(false);
    elements.filterDiv.style.display = 'none'; // Also hide the filter overlay
    event.target.reset();
    refreshTasksUI();
  }
}


function toggleSidebar(show) { // Controls the visibility of a sidebar in  the user interface
  elements.sideBar.style.display = show ? 'block' : 'none';
  elements.showSideBarBtn.style.display = show ? 'none' : 'block';
}


// Get current theme from local storage or set to default (light)
const currentMode = localStorage.getItem('mode') || 'light';
let isLightMode = currentMode === 'light';

// Set the initial SVG source based on the current mode
let sideLogoDivSrc = isLightMode ? './assets/logo-dark.svg' : './assets/logo-light.svg';
elements.sideLogoDiv.src = sideLogoDivSrc;


function toggleTheme() {
  //const isDarkTheme = document.body.classList.contains('dark-theme');
  //localStorage.setItem('dark-theme', isDarkTheme? 'enabled' :'disabled'); 
  if (localStorage.getItem('light-theme') == 'enable') {
    document.body.classList.toggle('light-theme', false);
    localStorage.setItem('light-theme', 'disable');
    let img = document.getElementById('logo');
    img.src = './assets/logo-dark.svg';
  }
  else {
    document.body.classList.toggle('light-theme', true);
    localStorage.setItem('light-theme', 'enable');
    let img = document.getElementById('logo');
    img.src = './assets/logo-light.svg';

  }
}


function openEditTaskModal(task) {
  // Set task details in modal inputs
  elements.editTaskTitleInput.value = task.title; // Populates task's title in an input field for editing
  elements.editTaskDescInput.value = task.description; // Populates task's description in input field for editing
  elements.editSelectStatus.value = task.status; // Sets selected status

  // Get button elements from the task modal
  const saveChangesBtn = document.getElementById('save-task-changes-btn'); // Retrieves element from HTML that represents a button that saves changes made to task
  const deleteTaskBtn = document.getElementById('delete-task-btn'); // Retrieves element from HTML that represents a button that deletes task
  const cancelEditTaskBtn = document.getElementById('cancel-edit-btn');

  // Call saveTaskChanges upon click of Save Changes button
  saveChangesBtn.addEventListener('click', () => {
    saveTaskChanges(task.id);
    toggleModal(false, elements.editTaskModal);
  });

  // Delete task using a helper function and close the task modal
  deleteTaskBtn.addEventListener('click', () => { // Included an event listener that triggers deletion of specified task 'deleteTask(task.id)', while also hiding the task modal, and then refreshing the tasks UI 
    deleteTask(task.id);
    toggleModal(false, elements.editTaskModal);
    refreshTasksUI();
  });

  cancelEditTaskBtn.addEventListener('click', () => {
    toggleModal(false, elements.editTaskModal);
  });

  toggleModal(true, elements.editTaskModal); // Show the edit task modal
  refreshTasksUI();
}


function saveTaskChanges(taskId) {
  // Get new user inputs
  const task_id = JSON.parse(localStorage.getItem('id')); // Fetches task ID from local storage
  const titleInput = elements.editTaskTitleInput.value; // Fetches current value entered that aloows users to input/edit title of a task 
  const descriptionInput = elements.editTaskDescInput.value; // Allows users to input/edit description or details of a task 
  const selectStatus = elements.editSelectStatus.value; // Chooses the status of the task

  // Create an object with the updated task details
  const updatedTask = {
    title: titleInput,
    description: descriptionInput,
    status: selectStatus,
    board: activeBoard,
  };

  // Update task using a helper function
  patchTask(taskId, updatedTask); // Takes two arguments to update task identified by 'taskId' with new data provided in 'updatedTask'

  // Close the modal and refresh the UI to reflect the changes
  // location.reload();
  toggleModal(false, elements.editTaskModal);
  refreshTasksUI();
}

/*const displayStoredTasks = () => {
  // Retrieving the tasks from localStorage
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    // Parsing the JSON string to an array of tasks
    const tasks = JSON.parse(storedTasks);

    // Logging tasks to console
    console.log(tasks);
  } else {
    console.log('No tasks stored in localStorage')
  }
}

// Calling the function to display the stored tasks
displayStoredTasks(); */

/*************************************************************************************************************************************************/

document.addEventListener('DOMContentLoaded', function () {
  init(); // init is called after the DOM is fully loaded
});

function init() {
  // Ensure that the correct logo image is displayed based on the stored value
  /* if (localStorage.getItem('sideLogoDiv') === './assets/logo-light.svg') {
    elements.sideLogoDiv.src = './assets/logo-light.svg';
  } */
  setupEventListeners();
  const showSidebar = localStorage.getItem('showSideBar') === 'true';
  toggleSidebar(showSidebar);
  const isLightTheme = localStorage.getItem('light-theme') === 'enabled';
  document.body.classList.toggle('light-theme', isLightTheme);
  fetchAndDisplayBoardsAndTasks(); // Initial display of boards and tasks
}