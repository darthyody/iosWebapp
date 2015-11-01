var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

$(function() {
   var date = new Date();

   var day = days[date.getDay()];
   var month = months[date.getMonth()];
   var dayDate = date.getDate();
   var year = date.getFullYear();
   var formattedDate = day + ', ' + month + ' ' + dayDate + ', ' + year;

   $('#todayDate').html(formattedDate);

   $('#test').html(bkData);
});

