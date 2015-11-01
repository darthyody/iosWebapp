$(function() {
   var setDate = localStorage.getItem('startDate');
   $('#startDate').html(setDate);
});

$('#save').click(function() {
   var startDate = $('#startDate').html();
   localStorage.setItem('startDate', startDate);
});

$('#reset').click(function() {
   var yesNo = confirm("Are you sure you want to reset your schedule?");
   if(yesNo) {
      localStorage.clear();
   }
});