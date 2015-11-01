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
      $('#books').append("<div id='checkAll' class='btnCheckAll'><span id='done' class='glyphicon glyphicon-ok'></span>ALL</div>")
      setClickEvents();
   });
});

var setClickEvents = function() {
   $(".btnSchedule").click(function(e) {
      markAsComplete(e.target);
   });
   $("#checkAll").click(function(e) {
      $('.btnSchedule').each(function() {
         markAsComplete(this);
      });
   });
}

var addCompleteMarker = function(object) {
   $(object).addClass("complete");
   $(object).append("<span id='done' class='glyphicon glyphicon-ok'></span>");
}

var markAsComplete = function(object) {
      if(localStorage.getItem(object.id)) {
         $(this).off();
         return;
      }
      localStorage.setItem(object.id, true);
      addCompleteMarker(object);
      setProgressBar();
}

var setProgressBar = function() {
   var value = 0;

   var i = 0;
   $(bkData.books).each(function() {
      $(this.schedule).each(function() {
         i++;
      });
   });
   var finished = localStorage.length;
   var progress = Math.round((finished / i) * 100);
   console.log(progress + '%');
   $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress).html(progress + '%');
}