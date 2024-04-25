# JSL11: Portfolio Piece: Agile Board - Kanban Task Management App

**LOOM video link:** []

# Introduction

The task was to use the provided user stories to identify and fix bugs in the code, as well as to develop our own functions to extend the application's capabilities. The goal was to enhance the application by crafting code to meet specific functionalities outlined in the user stories, like managing task details and their lifecycle, toggling theme customization, etc.

# Elements Included

Some of the elements in this project were buttons, input fields, modal elements, header elements, and sidebar elements.

# Reflections

# Areas of Mastery

**Task Management:** I believe I was able to maneouvre through creating, editing, deleting, and displaying the tasks according to their boards and status proficiently.

# Challenges Faced

I think this was so far the most demanding project to complete. There were many challenges, one of them being managing the data in localStorage, and ensuring the correct selection and manipulation of DOM elements.

# Overall Learning Experience

Having to fix all the bugs while combining what little UI styling knowledge I have with concepts like DOM manipulation, UI/UX implementation, and event handling almost had me at my breaking point but opened my eyes to daily activities in industry and helped me build on my troubleshooting and overall coding skills.

# User Stories: Task Interaction and Detail Management

- **Clicking an Individual Task for Details**: As a user, I want to click on an individual task so that I can view its details and make edits if necessary.
- **Opening the Task Edit Modal**: As a user, I want to open a modal window when adding or editing tasks to easily input task information.
- **Updating the Task Title**: As a user, I want to update the task title within the modal to change how it’s displayed on the board.
- **Updating the Task Description**: As a user, I want to update the task description within the modal so I can better describe what needs to be done.
- **Updating the Task Status**: As a user, I want to update the current status of a task (todo, doing, done) to track its progress.
- **Saving Task Changes**: As a user, I want to save the changes I make to a task so that the updated details are stored and displayed.
- **Updating the UI with Task Changes**: As a user, I expect the changes I make to a task to be reflected immediately on the UI without needing to refresh.
- **Deleting a Task from the Edit Modal**: As a user, I want the ability to delete a task directly from the edit modal if it’s no longer needed.
- **Canceling Edits Without Saving**: As a user, I want to be able to cancel my edits and close the modal without saving to avoid accidental changes.
- **Editing Task Details**: As a user, I want to edit the details of an existing task to correct or update information as needed.
- **Easy Navigation Between Task Statuses**: As a user, I want to easily move tasks between statuses (todo, doing, done) to reflect their current progress.
- **Viewing Task Details**: As a user, I want to view detailed information about a task to understand its scope and requirements fully.

![alt text](assets/delete-feature.gif)

# Task Deletion and Confirmation Mechanisms

- **Clicking "Delete Task" Button**: As a user, I want to click a "Delete Task" button within the task edit modal so I can remove tasks that are no longer necessary.
- **Immediate UI Update on Task Deletion**: As a user, I expect a task to disappear from the UI immediately after I confirm its deletion to reflect the current state of my task list.
  ![alt text](<assets/Theme Customization.gif>)

# Theme Customization

- **Switching to Dark Mode**: As a user, I want to switch to dark mode so that I can reduce eye strain in low-light conditions.
- **Switching Back to Light Mode**: As a user, I want to switch back to light mode from dark mode to better suit bright environments and see the logo update accordingly.

![alt text](assets/sidebar-feature.gif)

# Managing the Sidebar

- **Hiding the Side Bar for More Workspace**: As a user, I want the ability to hide the side bar to gain more workspace.
- **Opening the Side Bar for Navigation and Options**: As a user, I want to easily open the side bar to navigate between boards.

![alt text](assets/add-task-feature.gif)

# Task Lifecycle Management

- **Clicking "Add New Task" to Start Adding a Task**: As a user, I want to click the "Add New Task" button so I can begin the process of adding a new task to my board.
- **Modal Opens for New Task Input**: As a user, I expect the modal to open when I click "Add New Task" to provide me with a form to input the task's details.
- **Adding a Title to the New Task**: As a user, I want to be able to add a title to my new task so I can clearly identify it on the board.
- **Adding a Description to the New Task**: As a user, I want to be able to add a description to my new task to provide more details about what needs to be done.
- **Selecting a Status for the New Task**: As a user, I want to select a status for my new task (e.g., Todo, Doing, Done) to categorize it based on its progress.
- **Creating the New Task**: As a user, I want to click a "Create Task" button in the modal to save the new task to the board.
- **New Task Appears in UI Under Correct Status**: As a user, I expect the new task to appear in the UI under the correct status column immediately after creation.
- **Viewing New Task Details**: As a user, I want to view detailed information about the New Task to understand its scope and requirements fully.
- **Editing New Task Details**: As a user, I want to edit the details of the New Task to correct or update information as needed.

![alt text](assets/localStorage-feature.gif)

# Local Storage and Data Persistence

- **Saving New Tasks in localStorage**: As a user, I want my newly created tasks to be saved in localStorage so that my tasks persist even when I close or refresh the browser.
- **Reflecting Task Updates in localStorage**: As a user, I expect tasks that I update to have their changes reflected in localStorage so that any modifications are not lost.
- **Removing Deleted Tasks from localStorage**: As a user, I want tasks that I delete to be removed from localStorage so that my task list remains accurate and up-to-date.
