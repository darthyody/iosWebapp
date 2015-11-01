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
   $('#back').hide();
   $('.btnBook').click(function(e) {
      $('#back').show();
      $('#reset').hide();
      $('#books').html("");
      var i = 0;
      $(data.books[e.target.id].schedule).each(function() {
         var id = data.books[e.target.id].name.replace(/\s+/g, '') + '_' + i;
         var btnSchedule = "<div id='" + id + "' class='btnSchedule'>" + this + "</div>";
         $('#books').append(btnSchedule);
         if(localStorage.getItem(id)) {
            console.log(id);
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
});

var setClickEvents = function() {
   $(".btnSchedule").click(function(e) {
      addCompleteMarker(e.target);
      localStorage.setItem(e.target.id, true);
      console.log(e.target.id);
      $(e.target).off();
   });
}

var addCompleteMarker = function(object) {
   $(object).addClass("complete");
   $(object).append("<span class='glyphicon glyphicon-ok'></span>");   
}
