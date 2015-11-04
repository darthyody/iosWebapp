
$(function() {
   $('#todayDate').html(getTodaysDate());
   getNextReading();;
});

function getTodaysDate() {
   var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   var days   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   var date = new Date();

   var day = days[date.getDay()];
   var month = months[date.getMonth()];
   var dayDate = date.getDate();
   var year = date.getFullYear();
   var formattedDate = day + ', ' + month + ' ' + dayDate + ', ' + year;
   return formattedDate;
}

function getBookName(aBooks, intBookID) {
   for (var i = 0; i < aBooks.length; i++) {
      if (aBooks[i].ID === intBookID) {
         return aBooks[i].Name;
      }
   }
}

function formatReading(aReading) {
   $.getJSON('js/json/bibleBooks.json', function(d) {
      var strReading = "";
      for (var i = 0; i < aReading.length; i++) {
         if (i > 0) {
            strReading += ", ";
         }
         var bookID = aReading[i].substring(0,2);
         var bkName = getBookName(d.books, bookID);
         strReading += bkName;
         var chapID = aReading[i].substring(2,5);
         strReading += " " + parseInt(chapID);
      }
      $('#reading').html(strReading);
   })
}

function getNextReading() {
   return $.getJSON('js/json/schedule01.json', function(d) {
      var progress = JSON.parse(localStorage.getItem('progress'));
      var completedChapters = (progress) ? progress.CompletedChapters : [];
      for (var i = 0; i < d.Schedule.length; i++) {
         for (var j = 0; j < d.Schedule[i].Reading.length; j++) {
            var read = d.Schedule[i].Reading[j];
            if ($.inArray(read, completedChapters) === -1) {
               // console.log(d.Schedule[i]);
               formatReading(d.Schedule[i].Reading);
               return;
            }
         }
      }
   });
}