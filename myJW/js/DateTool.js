var DateTool = DateTool || {};

DateTool.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
DateTool.Days   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

DateTool.getFormattedDate = function(objDate) {
   var day   = objDate.getDate();
   var month = objDate.getMonth() + 1;
   var year  = objDate.getFullYear();
   return year + ' ' + month + ' ' + day;
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