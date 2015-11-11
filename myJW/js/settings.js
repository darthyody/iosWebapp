function init() {
   $('#startdate').val(DateTool.getPrettyDate(new Date(Progress.StartDate)));
   var day = (DateTool.getReadingDay()) ? DateTool.getReadingDay() : 1;
   var reading = Schedule.getReadingForDay(day);
   var formattedReading = Schedule.getFormattedReading(reading);
   $('#ScheduledReading').html(formattedReading);
   var blOk = (Progress.CompletedChapters.length === 0) ? true : false;
   $('#autocomplete').prop('checked', blOk);
   $('#nocomplete').prop('checked', !blOk);




   var $csl = $('#console');
   var dateNow    = new Date();
   var dateNowFm  = DateTool.getFormattedDate(new Date());
   var dateCtd    = DateTool.getFormattedDate(new Date('2015 11 11'));
   var savedNow   = Progress.StartDate;
   var savedNowFm = DateTool.getFormattedDate(new Date(Progress.StartDate));
   $csl.append("<p>NOW: " + typeof dateNow + dateNow + "</p>");
   $csl.append("<p>NOW FRMT: " + typeof dateNowFm + dateNowFm + "</p>");
   $csl.append("<p>NOW CREATED: " + typeof dateCtd + dateCtd + "</p>");
   $csl.append("<p>SAVED: " + typeof + savedNow + savedNow + "</p>");
   $csl.append("<p>SAVED FRMT: " + typeof + savedNowFm + savedNowFm + "</p>");
}
init();

$('#save').click(function() {
   var $csl    = $('#console');
   var date = DateTool.getFormattedDate(new Date($('#startdate').val()));
   $csl.append("<p>pre-reset: " + typeof + Progress.StartDate + Progress.StartDate + "</p>");

   var blOk = ($('#autocomplete:checked').val()) ? true : false;
   Progress.StartDate = date;
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
   // location.reload();

   var newDate = $('#startdate').val();
   $csl.append("<p>NEW DATE: " + typeof + newDate + newDate + "</p>");
   $csl.append("<p>SAVE AS: " + typeof + date + date + "</p>");
   $csl.append("<p>post-reset: " + typeof + Progress.StartDate + Progress.StartDate + "</p>");
});

$('#reset').click(function() {
   var $csl    = $('#console');
   $csl.append("<p>pre-reset: " + typeof + Progress.StartDate + Progress.StartDate + "</p>");
   var yesNo = confirm("Are you sure you want to reset your schedule?");
   if(yesNo) {
      Progress.initSavedProgress();
      // location.reload();
   }

   $csl.append("<p>post-reset: " + typeof + Progress.StartDate + Progress.StartDate + "</p>");
});