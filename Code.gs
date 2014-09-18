// Triggers, and miscelaneous helpers for regular GAS services

/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Update Data", 
    functionName : "manualUpdate"
  }];
  spreadsheet.addMenu("Update", entries);
};


function onEdit() {
  sortByPriority(); // keep rows sorted on Priority
  
  // **********************************
  // update, IF ITS EVEN FUKIN POSSIBLE
  // **********************************
  
}


function sortByPriority() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Overview");
  var range = sheet.getDataRange();
  var priority_index = getColIndexByName("Priority");
  
  range.sort({column: priority_index, ascending: false});
}


/**
 * self explanatory
 * returns -1 if name not found
 */
function getColIndexByName(colName) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var numColumns = sheet.getLastColumn();
  var row = sheet.getRange(1, 1, 1, numColumns).getValues();
  for (i in row[0]) {
    var name = row[0][i];
    if (name == colName) {
      return parseInt(i) + 1;
    }
  }
  return -1;
}


