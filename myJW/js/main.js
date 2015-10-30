var spreadsheetID = "1Q21FM4uKe9_LDuY9_LuStVY0vppIvSm-YAjMjzLX6Uk";
// Make sure it is public or set to Anyone with link can view
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

// $.getJSON(url, function(data) {
//   var entry = data.feed.entry;
//   $(entry).each(function(){
//     var read = "<div class='txt-left dailyChaps btn btn-default'><input type='checkbox' id='checkbox-" +
//      this.gsx$id.$t +
//       "' class='txt-right pseudo-checkbox sr-only'/><label for='checkbox-" +
//       this.gsx$id.$t + "'>" +
//       this.gsx$book.$t + ' ' +
//       this.gsx$first.$t + '-' +
//       this.gsx$last.$t +
//       " </label></div>";
//     $('.results').append(read);
//   });
//  });

$.getJSON('js/books.json', function (data) {
   var i = 0;
   $(data.books).each(function(){
      this.id = i;
      var btnBook = "<div id='" + this.id + "' class='btnBook'>" + this.abbr + "</div>";
      $('#books').append(btnBook);
      i++;
   });
}).then(function(data) {
   $('#back').hide();
   $('.btnBook').click(function(e) {
      $('#back').show();
      $('#books').html("");
      $(data.books[e.target.id].schedule).each(function() {
         var btnSchedule = "<div class='btnSchedule'>" + this + "</div>";
         $('#books').append(btnSchedule);
      });
      setClickEvents();
   });
});

var setClickEvents = function() {
   $(".btnSchedule").click(function(e) {
      console.log(e.target);
      $(e.target).addClass("complete");
      $(e.target).append("<span class='glyphicon glyphicon-ok'></span>");
   });
}