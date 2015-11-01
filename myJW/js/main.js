var bkData;
$.getJSON('js/books.json', function (data) {
   var i = 0;
   $(data.books).each(function(){
      this.id = i;
      if (this.id === 0) {
         $('#books').append("<h5 class='bibleSection'>HEBREW-ARAMAIC SCRIPTURES</h5>");
      } else if (this.id === 39) {
         $('#books').append("<h5 class='bibleSection'>CHRISTIAN GREEK SCRIPTURES</h5>");         
      };

      var btnBook = "<div id='" + this.id + "' class='btnBook'>" + this.abbr + "</div>";
      $('#books').append(btnBook);
      i++;
   });
}).then(function(data) {
   bkData = data;
   setProgressBar(data);
   $('#back').hide();
   $('.btnBook').click(function(e) {
      $('#back').show();
      $('#reset').hide();
      $('#books').html("");
      $('#pgTitle').html(data.books[e.target.id].name);
      var i = 0;
      $(data.books[e.target.id].schedule).each(function() {
         var id = data.books[e.target.id].name.replace(/\s+/g, '') + '_' + i;
         var btnSchedule = "<div id='" + id + "' class='btnSchedule'>" + this + "</div>";
         $('#books').append(btnSchedule);
         if(localStorage.getItem(id)) {
            addCompleteMarker($('#' + id));
         }
         i++;
      });
      setClickEvents();
   });
});

$('#reset').click(function() {
   var yesNo = confirm("Are you sure you want to reset your schedule?");
   if(yesNo) {
      localStorage.clear();
   }
   setProgressBar();
});

var setClickEvents = function() {
   $(".btnSchedule").click(function(e) {
      if(localStorage.getItem(e.target.id)) {
         $(this).off();     
         return;
      }
      localStorage.setItem(e.target.id, true);    
      addCompleteMarker(e.target);
      setProgressBar();
   });
}

var addCompleteMarker = function(object) {
   $(object).addClass("complete");
   $(object).append("<span id='done' class='glyphicon glyphicon-ok'></span>");   
}

var setProgressBar = function() {
   var i = 0;
   $(bkData.books).each(function() {
      $(this.schedule).each(function() {
         i++;
      });
   });
   var finished = localStorage.length;
   $('#progress').html(finished + '/' + i + ' completed');
}