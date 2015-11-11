var Page = Page || {};
Page.resetPage = function() {
   $('#main').html("");
}

Page.loadToday = function() {
   $('#main').load('today.html', function() {
      $('#todayDate').html(DateTool.getTodaysDate());
      Progress.getNextReading();
      $('#done').click(function(e) {
         Progress.saveCurrentReading();
         Progress.getNextReading();
      });
   });
}

Page.loadSchedule = function() {
   $('#main').load('schedule.html', function() {
      Bible.listBooksView();
   });
}

Page.loadSettings = function() {
   $('#main').load('settings.html');
}

Page.displayPage = function() {
   var pgHash = window.location.hash.substring(1);
   Page.resetPage();
   switch(pgHash) {
      case "schedule":
         Page.loadSchedule();
         break;
      case "settings":
         Page.loadSettings();
         break;
      default:
         Page.loadToday();
   }
}
