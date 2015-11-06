
function init() {
   $('#todayDate').html(getTodaysDate());
   getNextReading();
}
init();

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

function formatReading(aSchedule) {
   $.getJSON('js/json/bibleBooks.json', function(d) {
      var strReading = "<div class='txt-center'><h4>Day " + parseInt(aSchedule.ID) + "</h4>";
      var aReading;
      for (var i = 0; i < aSchedule.Reading.length; i++) {
         var oRead    = {};
         var bookID   = aSchedule.Reading[i].substring(0,2);
         var bookName = getBookName(d.books, bookID);
         var chapID   = parseInt(aSchedule.Reading[i].substring(2,5));

         oRead.bookID   = bookID;
         oRead.bookName = bookName;
         oRead.chapters = [chapID];

         if (!aReading) {
            aReading = [];
            aReading.push(oRead);
         } else {
            $(aReading).each(function() {
               if (this.bookID === oRead.bookID) {
                  this.chapters.push(chapID)
               } else {
                  aReading.push(oRead);
               }
            });
         }
      }
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
      console.log(strReading);
      $('#reading').html(strReading);
      $('#done').click(function(e) {
         for (var i = 0; i < aSchedule.Reading.length; i++) {
            markAsComplete(aSchedule.Reading[i]);
            getNextReading();
         }
      });
   })
}

function getNextReading() {
   $.getJSON('js/json/schedule01.json', function(d) {
      var progress = JSON.parse(localStorage.getItem('progress'));
      var completedChapters = (progress) ? progress.CompletedChapters : [];
      for (var i = 0; i < d.Schedule.length; i++) {
         for (var j = 0; j < d.Schedule[i].Reading.length; j++) {
            var read = d.Schedule[i].Reading[j];
            if ($.inArray(read, completedChapters) === -1) {
               formatReading(d.Schedule[i]);
               return;
            }
         }
      }
   });
}

function markAsComplete(intChapID) {
      var savedProgress = JSON.parse(localStorage.getItem('progress'));
      if (!savedProgress) {
         savedProgress = initSaveProgress();
      }
      if (!isChapterComplete(intChapID)) {
         savedProgress.CompletedChapters.push(intChapID);
         localStorage.setItem('progress', JSON.stringify(savedProgress));
      }
}

function initSaveProgress(date) {
   var newDate = (date) ? date : getFormattedDate(new Date());
   localStorage.clear();
   var progress = {};
   progress.StartDate = newDate;
   progress.CompletedChapters = [];
   return progress;
}

function getFormattedDate(objDate) {
   var day   = objDate.getDate();
   var month = objDate.getMonth() + 1;
   var year  = objDate.getFullYear();
   return year + ' ' + month + ' ' + day;
}

function isChapterComplete(intChapID) {
   var savedProgress = JSON.parse(localStorage.getItem('progress'));
   var completeChapters = (savedProgress) ? savedProgress.CompletedChapters : [];
   return ($.inArray(intChapID, completeChapters) !== -1);
}