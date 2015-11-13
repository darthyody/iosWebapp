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

Page.loadReading = function() {
   $('#main').load('reading.html', function() {
      $('#date').html(DateTool.getTodaysDate());
      var strMsg = "";
      var strClass = "";
      var status = Progress.getStatus();
      switch(status.log) {
         case "ONTIME":
            strMsg = "ON SCHEDULE";
            strClass = "status-white";
            break;
         case "AHEAD":
            strMsg = "AHEAD BY " + status.days + " DAYS";
            strClass = "status-green";
            break;
         case "BEHIND":
            strMsg = "BEHIND BY " + status.days + " DAYS";
            strClass = "status-red";
            break;
      }
      $('#status').html(strMsg).addClass(strClass);
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
      case "reading":
         Page.loadReading();
         break;
      default:
         Page.loadToday();
   }
}
