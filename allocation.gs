// Work in Progress completion function
 
function allocated_hours(name) {
 var calendar = CalendarApp.getCalendarsByName(name)[0]; // breaks if 2 calendars have the same name
  if (!calendar) { // someday check that calendar not null
    return "CALENDAR NOT FOUND";
  }
  
  var week = currentWeek(); // week formatted as normal dates to interface with calenarApp more easily
  var events = calendar.getEvents(week.start, week.end);
  var allocated_time = moment.duration(); // duration more intuitive with moment.js
  
  for (var i = 0; i < events.length; ++i) { // add up durations (in ms) of individual events in allocated_time
    var event_time = events[i].getEndTime() - events[i].getStartTime(); 
    allocated_time.add(event_time); 
  }
  
  return allocated_time.asHours();
}


/**
 * Answers the first question 
 * Tests that all time allocated for calendar specified by *name* 
 * adds up to less than or equal to *hours_per_week* for the (current week | next 7 days).
 * Returns a code denoting sucess when above is true, returns a 
 * message with the amount of overreach if false.
 * 
 */
 
function allocated_within_range (name, hours_per_week) {
  var calendar = CalendarApp.getCalendarsByName(name)[0]; // breaks if 2 calendars have the same name
  if (!calendar) { // someday check that calendar not null
    return "CALENDAR NOT FOUND";
  }
  
  var week = currentWeek(); // {start: Date, end: Date}
  var events = calendar.getEvents(week.start, week.end);
  var allocated_time = moment.duration(); // duration more intuitive with moment.js
  
  for (var i = 0; i < events.length; ++i) { // add up durations (in ms) of individual events in allocated_time
    var event_time = events[i].getEndTime() - events[i].getStartTime(); 
    allocated_time.add(event_time); 
  }
  
  var time_difference = hours_per_week - allocated_time.asHours();
  
  if (time_difference === 0) { // could come up with a more informative scheme for returning information
    return "match";
  } else if(time_difference > 0) {
    return time_difference + " hour(s) under";
  } else {
    return time_difference * -1 + " hour(s) over";
  }
}
  
function test() {
  //Logger.log(completion_within_range("Machine Learning", 10));
}
