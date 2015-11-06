var DateTool = DateTool || {};

DateTool.getFormattedDate = function(objDate) {
   var day   = objDate.getDate();
   var month = objDate.getMonth() + 1;
   var year  = objDate.getFullYear();
   return year + ' ' + month + ' ' + day;
}

DateTool.getPrettyDate = function(objDate) {
   var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   var day   = objDate.getDate();
   var month = months[objDate.getMonth()];
   var year  = objDate.getFullYear();
   return month + ' ' + day + ', ' + year;
}