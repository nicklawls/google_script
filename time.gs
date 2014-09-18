// Any functions returning time data. Makes use of moment.js

var moment = Moment.load(); // load moment.js for the whole project

/**
 * Identifies the current week (Sunday to Saturday)
 * returns and object with beginning of the past sunday and end of upcoming saturday
 * as members
 */
function currentWeek() {
  var start = moment().startOf('week').toDate();
  var end = moment().endOf('week').toDate();
  return {start:start, end:end};
}

function till_time(time, unit) {
  if (time === "-") { return "-"; };
  if (!time) { return ""; }
  var time = moment(time);
  time_till =  time.diff(moment(), unit);
  return time_till + " " + unit;
}

function testTime() {
  Logger.log(till_time('8/19/2014'))
}