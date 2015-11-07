var Progress = Progress || {};

Progress.StartDate;
Progress.CompletedChapters;

Progress.init = function() {
   var savedProgress = JSON.parse(localStorage.getItem('progress'));
   if (!savedProgress) {
      savedProgress = Progress.initSavedProgress();
   }
   Progress.StartDate = savedProgress.StartDate;
   Progress.CompletedChapters = savedProgress.CompletedChapters;
}

Progress.initSavedProgress = function(date) {
   var newDate = (date) ? DateTool.getFormattedDate(date) : DateTool.getFormattedDate(new Date());
   localStorage.clear();
   var progress = {};
   progress.StartDate = newDate;
   progress.CompletedChapters = [];
   return progress;
}

Progress.save = function() {
   var currentProgress = {};
   currentProgress.StartDate = Progress.StartDate;
   currentProgress.CompletedChapters = Progress.CompletedChapters;
   localStorage.setItem('progress', JSON.stringify(currentProgress));
}

Progress.addChapter = function(intChapID) {
   Progress.CompletedChapters.push(intChapID);
};

Progress.removeChapter = function(intChapID) {
   var index = $.inArray(intChapID, Progress.CompletedChapters);
   if (index !== -1) {
      Progress.CompletedChapters.splice(index, 1);
   }
};

Progress.updateBar = function(aBooks) {
   var value = 0;
   var i = 0;
   $(aBooks).each(function() {
      i += this.Chapters;
   });
   var finished = Progress.CompletedChapters.length;
   var progress = Math.round((finished / i) * 100);
   $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress).html(progress + '%');
}

Progress.init();