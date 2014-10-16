// ALL PROGRESS FUNCTION DEFINITIONS GO HERE

/**
 * Progress Function Template
 */
function my_progress() {
  // gather data as necessary
  
  //if (/*data point does not pass criteria*/) {
    /* Add to error message */
  //}
  
  // repeat for all data points
  
  // if error message empty return success
  // else return error message
}

function testProgress() {
  Logger.log(progress("Revision"));
}

/**
 * Since cells are updated manually, call a function for a cell based on name
 */
function progress(name) { 
  switch(name) { // something like this
    case 'Revision':
      return revision_progress();
      break;
    case 'Data': 
      return data_progress();
      break;
    case 'Scheming':
      return scheming_progress();
      break;
    case 'Meditation':
      return meditation_progress();
      break;
    default:
      return "No Function Defined";
  }
}


/**
 * Progress function for scheming
 * For now, just completion of every scheduled scheming tasks
 */
function scheming_progress() {
  var numLateTasks = daily_uncompleted_tasks("Scheming");
  var error = "";
  if (numLateTasks > 0) {
    error = numLateTasks + " tasks incomplete"; 
  } 
  
  if (error) {
    return error;
  } else {
    return "clear";
  }
}

/**
 * Progress function for data
 * for now, just completion of scheduled data tasks
 */
function data_progress() {
  var numLateTasks = daily_uncompleted_tasks("Data");
  var error = "";
  if (numLateTasks > 0) {
    error = numLateTasks + " tasks incomplete"; 
  } 
  
  if (error) {
    return error;
  } else {
    return "clear";
  }
}

/**
 * Progress function for meditation
 * for now, just completion of scheduled data tasks
 */
function meditation_progress() {
  var numLateTasks = daily_uncompleted_tasks("Meditation");
  var error = "";
  if (numLateTasks > 0) {
    error = numLateTasks + " tasks incomplete"; 
  } 
  if (error) {
    return error;
  } else {
    return "clear";
  }
}

function wellness_progress() {
  var numLateTasks = daily_uncompleted_tasks("Wellness");
  var error = "";
  if (numLateTasks > 0) { // goal reporting
    error = numLateTasks + " tasks incomplete"; 
    return error; // doesnt evaluate goals unless tasks complete
  }
  
  if (error) {
    return error;
  } else {
    return "clear";
  }
}


/**
 * Progress function for revision
 */
function revision_progress() {
  // get data sources
  var numLateTasks = daily_uncompleted_tasks("Revision");
  
  // need to access control center itself to check progress of other coa's
  var sheet = SpreadsheetApp.getActiveSheet(); // assumes structure of spreadsheet consistent
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var progress_index = getColIndexByName("Progress");
  var numNoProgress = 0;
  
  for (var i = 2; i < numRows; ++i) { // go one less than total rows
    var progress = rows.getCell(i, progress_index).getValue();
    if (progress !== "clear" && progress !== "No Function Defined") { // only 2 critera of success
      ++numNoProgress;
    }
  }
  
  var error = ""; // error string to build upon
  
  // criteria
  if (numLateTasks > 0) {
    error = numLateTasks + " tasks incomplete"; 
  } 
  
  if (numNoProgress > 0) {
    if (error) {
      error += "\n";
    }
    error = error + numNoProgress + " courses not progressing"
  }
  
  if (error) {
    return error;
  } else {
    return "clear";
  }
}
