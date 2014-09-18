// Note: Some Classes/APIs have cell invoking restrictions and return a no permission error.
// The onEdit Event trigger can be used as a workaround for more advanced control through cells.

/**
 * Main interface to the spreadsheet itself. 
 * respect the (rows, numRows) pattern
 */
function manualUpdate() {
  var sheet = SpreadsheetApp.getActiveSheet(); // assumes structure of spreadsheet consistent
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  
  //updateTaskCompletion(rows, numRows);
  updateAllocation(rows, numRows);
}

/**
 * Update Progress column separately
 * Would likely run faster if interleaved with updateCompletion
 */
function updateTaskCompletion(rows, numRows) {
  var name_index = getColIndexByName("Course of Action");
  var progress_index = getColIndexByName("Late Tasks");
  
  for (var i = 2; i <= numRows; ++i)  {
    var name = rows.getCell(i, name_index).getValue(); 
    if (name) { // null check, getDataRange might grab extra rows
      rows.getCell(i, progress_index).setValue(uncompleted_tasks(name)); 
    }
  }
}

/** 
 * Update completion column separately
 * Would likely run faster if interleaved with updateProgress
 */
function updateAllocation(rows, numRows) {
  var name_index = getColIndexByName("Course of Action");
  var hours_index = getColIndexByName("Hours per Week");
  var completion_index = getColIndexByName("Allocated Hours This Week");
  for (var i = 2; i <= numRows; ++i) {
    var name = rows.getCell(i, name_index).getValue();
    //var hours = rows.getCell(i, hours_index).getValue(); old
    if (name /*&& hours*/) { // null check, getDataRange might grab extra rows
      rows.getCell(i, completion_index).setValue(allocated_hours(name));
    }
  }
}