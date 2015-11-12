function init() {
   $('#startdate').val(DateTool.getPrettyDate(new Date(Progress.StartDate)));
   var day = (DateTool.getReadingDay()) ? DateTool.getReadingDay() : 1;
   var reading = Schedule.getReadingForDay(day);
   var formattedReading = Schedule.getFormattedReading(reading);
   $('#ScheduledReading').html(formattedReading);
   var blOk = (Progress.CompletedChapters.length === 0) ? true : false;
   $('#autocomplete').prop('checked', blOk);
   $('#nocomplete').prop('checked', !blOk);
}
init();

$('#save').click(function() {
   var date = DateTool.getFormattedDate(new Date($('#startdate').val()));

   var blOk = ($('#autocomplete:checked').val()) ? true : false;
   Progress.StartDate = DateTool.getFormattedDate(date);
   if (blOk) {
      var day = DateTool.getReadingDay();
      for (var i = 0; i < day; i++) {
         for (var j = 0; j < Schedule.Schedule[i].Reading.length; j++) {
            var intChapID = Schedule.Schedule[i].Reading[j];
            Progress.addChapter(intChapID);
         }
      }
   }
   Progress.save();
   location.reload();
});

$('#reset').click(function() {
   var yesNo = confirm("Are you sure you want to reset your schedule?");
   if(yesNo) {
      Progress.initSavedProgress();
   }
});