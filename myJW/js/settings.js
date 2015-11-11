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
   Progress.StartDate = date;
   if (blOk) {
      console.log("complete all the chapters");
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