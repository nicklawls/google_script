// Functions for accessing tasklists and tasks


/*
 * Maps a course of action name string to a taskListId
 * Returns -1 if cooresponding task list not found
 */

function name_to_tasklist_id(name) {
  var taskLists = Tasks.Tasklists.list(); 
  for (var i = 0; i < taskLists.items.length; ++i) {
    Logger.log(taskLists.items[i].title)
    if (name === taskLists.items[i].title) {
      return taskLists.items[i].id;
    }
  }
  return -1;
}

/*
 * Pulls up task list for given course of action specified by id
 * Returns the number of tasks not completed by their deadline as of today
 */
function uncompleted_tasks(name) {
  var taskListId = name_to_tasklist_id(name);
  if (taskListId === -1) {
    return "No Tasklist";
  }
  var tasks = Tasks.Tasks.list(taskListId).items;
  if (!tasks) { // tasks array empty, good to go
    return 0;
  }
  var uncompleted_tasks = 0;
  for (var i = 0; i < tasks.length; ++i) {
    var task = tasks[i];
    if (!(task.completed) && task.due) { // only evaluates tasks with set due dates, at least I hope it does
      var due_date_string = task.due.slice(0,(task.due.length-1)); // remove trailing M from due string for moment parsing
      var due_date = moment(due_date_string); // leave due_date moment at beginning of day, room to play around with this    
      var now = moment();
      if (due_date.isBefore(now)) {
        ++uncompleted_tasks;
      }
    }
  }
  return uncompleted_tasks;
}

function testStuff() {
var tasklist = name_to_tasklist_id("Wellness");
//Logger.log(tasklist)
//Logger.log(daily_uncompleted_tasks("Hygiene"));


//Logger.log(name)



}



