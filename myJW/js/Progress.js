var Progress = Progress || {};

Progress.StartDate;
Progress.AllChapters;

Progress.init = function() {
   var savedProgress = JSON.parse(localStorage.getItem('progress'));
   if (!savedProgress) {
      savedProgress = Progress.initSavedProgress();
   }
}

Progress.initSavedProgress = function(date) {
   var newDate = (date) ? DateTool.getFormattedDate(date) : DateTool.getFormattedDate(new Date());
   localStorage.clear();
   var progress = {};
   progress.StartDate = newDate;
   progress.CompletedChapters = [];
   return progress;
}

Progress.init();