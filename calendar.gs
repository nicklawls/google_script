function deleteCalendar() {
  var name = SpreadsheetApp.getUi().prompt("Which Calendar would you delete?");
  Logger.log(name.getResponseText());
  var calendar = CalendarApp.getCalendarsByName(name)[0];
  calendar.deleteCalendar();
}
