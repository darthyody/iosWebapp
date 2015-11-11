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
   $('#books').html("");
   $('#books').append("<h3 class='bibleSection'>Actual Reading</h3>");
   Schedule.addReadingDisplay(aSchedule.Reading);
   $('#books').append("<h3 class='bibleSection'><hr>Scheduled Reading</h3>");
   var day = (DateTool.getReadingDay()) ? DateTool.getReadingDay() : 1;
   var reading = Schedule.getReadingForDay(day);
   Schedule.addReadingDisplay(reading);

   var strReading = "<div class='txt-center'><h4>Day " + day + "</h4>";
   var aReading = Schedule.listReadingByBook(aSchedule.Reading);
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
   $('#reading').html(strReading);
}

Schedule.getReadingForDay = function(intDayID) {
   var reading = [];
   for (var i = 0; i < Schedule.Schedule.length; i++) {
      if (intDayID === parseInt(Schedule.Schedule[i].ID)) {
         reading = Schedule.Schedule[i].Reading;
      }
   }
   return reading;
}

Schedule.addReadingDisplay = function(aReading) {
   var mBkToChap = Schedule.listReadingByBook(aReading);
   for (var i = 0; i < mBkToChap.length; i++) {
      var $bkName = $("<h4></h4>", {class: "bibleSection"});
      $bkName.html(mBkToChap[i].bookName);
      $('#books').append($bkName);
      for (var j = 0; j < mBkToChap[i].chapters.length; j++) {
         var book = Bible.getBook(mBkToChap[i].bookID);
         Bible.addChapterBtn(book, mBkToChap[i].chapters[j]);
      }
   }
}

Schedule.listReadingByBook = function(aReading) {
   var mBkToChap;
   for (var i = 0; i < aReading.length; i++) {
      var oRead    = {};
      var bookID   = aReading[i].substring(0,2);
      var book     = Bible.getBook(bookID);
      var chapID   = parseInt(aReading[i].substring(2,5));

      oRead.bookID   = bookID;
      oRead.bookName = book.Name;
      oRead.chapters = [chapID];

      if (!mBkToChap) {
         mBkToChap = [];
         mBkToChap.push(oRead);
      } else {
         var blIsReadingListed = false;
         $(mBkToChap).each(function() {
            if (this.bookID === oRead.bookID) {
               this.chapters.push(chapID);
               blIsReadingListed = true;
            }
         });
         if (!blIsReadingListed) {
            mBkToChap.push(oRead);
         }
      }
   }
   return mBkToChap;
}