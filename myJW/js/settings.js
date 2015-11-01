$('#save').click(function() {
   localStorage.removeItem('startDate');
});

$('#reset').click(function() {
   var yesNo = confirm("Are you sure you want to reset your schedule?");
   if(yesNo) {
      localStorage.clear();
   }
});