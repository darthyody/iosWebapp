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

   $.getJSON('js/books.json', function(data) {
      var total = 0;
      var complete = localStorage.length;
      var savedBook = '';
      var savedChap = '';
      $(data.books).each(function() {
         var book = this;
         if (complete >= book.schedule.length) {
            complete = complete - book.schedule.length;
         } else if (!savedBook) {
            savedBook = book;
            savedChap = book.schedule[complete];
         }
      });
      $('#reading').html(savedBook.name + ' ' + savedChap);
   });
});

