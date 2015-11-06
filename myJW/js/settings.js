function init() {
   var progress = JSON.parse(localStorage.getItem('progress'));
   if (!progress) {
      progress = initSaveProgress()
   }
   $('#startdate').val(getPrettyDate(new Date(progress.StartDate)));
   var blOk = (progress.CompletedChapters.length === 0) ? true : false;
   $('#autocomplete').prop('checked', blOk);
   $('#nocomplete').prop('checked', !blOk);
}
init();

$('#save').click(function() {
   var date = getFormattedDate(new Date($('#startdate').val()));
   var blOk = ($('#autocomplete:checked').val()) ? true : false;
   var progress = JSON.parse(localStorage.getItem('progress'));

   if(!progress) {
      initSaveProgress(date);
   } else {
      progress.StartDate = date;
   }
   localStorage.setItem('progress', JSON.stringify(progress));
   location.reload();
});

$('#reset').click(function() {
   var yesNo = confirm("Are you sure you want to reset your schedule?");
   if(yesNo) {
      localStorage.clear();
   }
});

function getFormattedDate(objDate) {
   var day   = objDate.getDate();
   var month = objDate.getMonth() + 1;
   var year  = objDate.getFullYear();
   return year + ' ' + month + ' ' + day;
}

function getPrettyDate(objDate) {
   var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   var day   = objDate.getDate();
   var month = months[objDate.getMonth()];
   var year  = objDate.getFullYear();
   return month + ' ' + day + ', ' + year;
}

function initSaveProgress(date) {
   var newDate = (date) ? date : getFormattedDate(new Date());
   localStorage.clear();
   var progress = {};
   progress.StartDate = newDate;
   progress.CompletedChapters = [];
   return progress;
}

// Enter the date you started your bible reading?
// Month, Day, Year

// The scheduled reading for today is ...
// Would you like to mark as complete all of the scheduled readings up to this point?