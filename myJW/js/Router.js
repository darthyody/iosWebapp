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

Page.loadChapters = function() {
   console.log("chapters");
}

Page.loadSchedule = function() {
   $('#main').load('schedule.html', function() {
      Bible.listBooksView();
   });
}

Page.loadSettings = function() {
   console.log("settings");
   $('#main').load('settings.html');
}

Page.displayPage = function() {
   var pgHash = window.location.hash.substring(1);
   Page.resetPage();
   switch(pgHash) {
      case "chapters":
         Page.loadChapters();
         break;
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
