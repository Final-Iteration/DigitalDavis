
function start_date() {
    const startDate = new Date();
    return startDate;
  }
  
  function end_date() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    return endDate;
  }
  
  const start = start_date()
  const end = end_date()

  console.log(start)
  console.log(end)