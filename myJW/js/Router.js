var Page = Page || {};
Page.resetPage = function() {
   $('#main').html("");
}

Page.loadToday = function() {
   $('#main').load('today.html');
}

Page.loadChapters = function() {
   console.log("chapters");
}

Page.loadSchedule = function() {
   $('#main').load('schedule.html');
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

$(window).on('hashchange', function() {
   Page.displayPage();
});

Page.displayPage();