var DateTool = DateTool || {};

DateTool.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
DateTool.Days   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

DateTool.getFormattedDate = function(objDate) {
   if (typeof objDate !== 'object') {
      objDate = new Date(objDate);
   }
   var day   = objDate.getDate();
   var month = objDate.getMonth() + 1;
   var year  = objDate.getFullYear();
   return month + '/' + day + '/' + year;
}

DateTool.getPrettyDate = function(objDate) {
   var day   = objDate.getDate();
   var month = DateTool.Months[objDate.getMonth()];
   var year  = objDate.getFullYear();
   return month + ' ' + day + ', ' + year;
}

DateTool.getTodaysDate = function() {
   var date = new Date();

   var day = DateTool.Days[date.getDay()];
   var month = DateTool.Months[date.getMonth()];
   var dayDate = date.getDate();
   var year = date.getFullYear();
   var formattedDate = day + ', ' + month + ' ' + dayDate + ', ' + year;
   return formattedDate;
}

DateTool.treatAsUTC = function(date) {
   var result = new Date(date);
   result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
   return result;
}

DateTool.daysSince = function(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (DateTool.treatAsUTC(endDate) - DateTool.treatAsUTC(startDate)) / millisecondsPerDay;
}

DateTool.getReadingDay = function() {
   var today = DateTool.getFormattedDate(new Date());
   var saved = Progress.StartDate;
   var days  = DateTool.daysSince(saved, today);
   return days;
}