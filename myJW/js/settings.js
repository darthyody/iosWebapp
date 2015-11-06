$('#save').click(function() {
   var date = $('#startdate').val();
   var blOk = $('#autocomplete:checked').val();
   blOk = (blOk) ? true : false;
   $('#teststuff').html('D: ' + date + '<br>R: ' + blOk);
});

$('#reset').click(function() {
   var yesNo = confirm("Are you sure you want to reset your schedule?");
   if(yesNo) {
      localStorage.clear();
   }
});

// Enter the date you started your bible reading?
// Month, Day, Year

// The scheduled reading for today is ...
// Would you like to mark as complete all of the scheduled readings up to this point?