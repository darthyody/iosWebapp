
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

function formatReading(aReading) {
   $.getJSON('js/json/bibleBooks.json', function(d) {
      var strReading = "<div class='txt-center'><h4>Day " + parseInt(aReading.ID) + "</h4>";
      for (var i = 0; i < aReading.Reading.length; i++) {
         if (i > 0) {
            strReading += ", ";
         }
         var bookID = aReading.Reading[i].substring(0,2);
         var bkName = getBookName(d.books, bookID);
         strReading += bkName;
         var chapID = aReading.Reading[i].substring(2,5);
         strReading += " " + parseInt(chapID);
      }
      $('#reading').html(strReading);
      $('#done').click(function(e) {
         for (var i = 0; i < aReading.Reading.length; i++) {
            markAsComplete(aReading.Reading[i]);
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

function initSaveProgress() {
   localStorage.clear();
   var progress = {};
   progress.StartDate = "November 3, 2015";
   progress.CompletedChapters = [];
   return progress;
}

function isChapterComplete(intChapID) {
   var savedProgress = JSON.parse(localStorage.getItem('progress'));
   var completeChapters = (savedProgress) ? savedProgress.CompletedChapters : [];
   return ($.inArray(intChapID, completeChapters) !== -1);
}