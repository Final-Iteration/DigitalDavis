const testDebugger = require('debug')('app:test');

function start_date() {
  const startDate = new Date();
  return startDate;
}

function end_date() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  return endDate;
}

const start = start_date();
const end = end_date();

testDebugger(start);
testDebugger(end);
