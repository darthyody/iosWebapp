var Schedule = Schedule || {};

Schedule.ID;
Schedule.Name;
Schedule.Desc;
Schedule.Schedule = {};

Schedule.init = function() {
   $.getJSON('js/json/schedule01.json', function(d) {
      Schedule.ID       = d.ID;
      Schedule.Name     = d.Name;
      Schedule.Desc     = d.Desc;
      Schedule.Schedule = d.Schedule;
   });
}

Schedule.formatReading = function(aSchedule) {
   Schedule.addReadingDisplay(aSchedule.Reading);
   var strReading = "<div class='txt-center'><h4>Day " + parseInt(aSchedule.ID) + "</h4>";
   var aReading;
   for (var i = 0; i < aSchedule.Reading.length; i++) {
      var oRead    = {};
      var bookID   = aSchedule.Reading[i].substring(0,2);
      var book     = Bible.getBook(bookID);
      var chapID   = parseInt(aSchedule.Reading[i].substring(2,5));

      oRead.bookID   = bookID;
      oRead.bookName = book.Name;
      oRead.chapters = [chapID];

      if (!aReading) {
         aReading = [];
         aReading.push(oRead);
      } else {
         var blIsReadingListed = false;
         $(aReading).each(function() {
            if (this.bookID === oRead.bookID) {
               this.chapters.push(chapID);
               blIsReadingListed = true;
            }
         });
         if (!blIsReadingListed) {
            aReading.push(oRead);
         }
      }
   }
   console.log(aReading);
   var strReading;
   $(aReading).each(function() {
      if (!strReading) {
         strReading = this.bookName;
      } else {
         strReading += "<br>" + this.bookName;
      }
      var chapters;
      for (var i = 0; i < this.chapters.length; i++) {
         if (!chapters) {
            chapters = this.chapters[i];
         } else if (i === (this.chapters.length - 1)) {
            chapters += "-" + this.chapters[i];
         }
      }
      strReading += " " + chapters;
   });
   console.log("next reading" + strReading);
   $('#reading').html(strReading);
}

Schedule.addReadingDisplay = function(aReading) {
   for (var i = 0; i < aReading.length; i++) {
      var bookID   = aReading[i].substring(0,2);
      var book     = Bible.getBook(bookID);
      var chapID   = parseInt(aReading[i].substring(2,5));
      Bible.addChapterBtn(book, chapID);
   }
   $('#books').prepend("<h4>" + book.Name + "</h4>");
}