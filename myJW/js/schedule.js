// var bkData;
// $.getJSON('js/books.json', function (data) {
//    var i = 0;
//    $(data.books).each(function(){
//       this.id = i;
//       if (this.id === 0) {
//          $('#books').append("<h5 class='bibleSection'>HEBREW-ARAMAIC SCRIPTURES</h5>");
//       } else if (this.id === 39) {
//          $('#books').append("<h5 class='bibleSection'>CHRISTIAN GREEK SCRIPTURES</h5>");
//       };

//       var btnBook = "<div id='" + this.id + "' class='btnBook'>" + this.abbr + "</div>";
//       $('#books').append(btnBook);
//       i++;
//    });
// }).then(function(data) {
//    bkData = data;
//    setProgressBar(data);
//    $('#back').hide();
//    $('.btnBook').click(function(e) {
//       $('#back').show();
//       $('#books').html("");
//       $('#pgTitle').html(data.books[e.target.id].name);
//       var i = 0;
//       $(data.books[e.target.id].schedule).each(function() {
//          var id = data.books[e.target.id].name.replace(/\s+/g, '') + '_' + i;
//          var btnSchedule = "<div id='" + id + "' class='btnSchedule'>" + this + "</div>";
//          $('#books').append(btnSchedule);
//          if(localStorage.getItem(id)) {
//             addCompleteMarker($('#' + id));
//          }
//          i++;
//       });
//       $('#books').append("<div id='checkAll' class='btnCheckAll'><span id='done' class='glyphicon glyphicon-ok'></span>ALL</div>")
//       setClickEvents();
//    });
// });

// var setClickEvents = function() {
//    $(".btnSchedule").click(function(e) {
//       markAsComplete(e.target);
//    });
//    $("#checkAll").click(function(e) {
//       $('.btnSchedule').each(function() {
//          markAsComplete(this);
//       });
//    });
// }


// var setProgressBar = function() {
//    var value = 0;

//    var i = 0;
//    $(bkData.books).each(function() {
//       $(this.schedule).each(function() {
//          i++;
//       });
//    });
//    var finished = localStorage.length;
//    var progress = Math.round((finished / i) * 100);
//    console.log(progress + '%');
//    $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress).html(progress + '%');
// }

function listBooksView() {
   return $.getJSON('js/json/bibleBooks.json', function(d) {
      $('#back').hide();
      var $hbrHeading = $("<h5></h5>", {class: "bibleSection"});
      $hbrHeading.html("HEBREW-ARAMAIC SCRIPTURES");
      $('#books').append($hbrHeading);
      $(d.books).each(function() {
         var $btnBook = $("<div></div>", {id: this.ID, class: "btnBook"});
         $btnBook.html(this.Abbr);
         $btnBook.css({"background-color": this.Color});
         $('#books').append($btnBook);
         if (this.ID === "39") {
            var $grkHeading = $("<h5></h5>", {class: "bibleSection"});
            $grkHeading.html("CHRISTIAN GREEK SCRIPTURES");
            $('#books').append($grkHeading);
         }
      });
   });
}

function markAsComplete(object) {
      var savedProgress = localStorage.getItem('progress');
      if (!savedProgress) {
         savedProgress = initSaveProgress();
      }
      savedProgress.CompletedChapters.push(object);
      console.log(savedProgress.CompletedChapters);
      addCompleteMarker(object);
      // setProgressBar();
}

function initSaveProgress() {
   var progress = {};
   progress.StartDate = "November 3, 2015";
   progress.CompletedChapters = [];
   return progress;
}

function addCompleteMarker(object) {
   $(object).addClass("complete");
   $(object).append("<span id='done' class='glyphicon glyphicon-ok'></span>");
}

function setClickEvents() {
   $(".btnSchedule").click(function(e) {
      markAsComplete(e.target);
   });
   $("#checkAll").click(function(e) {
      $('.btnSchedule').each(function() {
         markAsComplete(this);
      });
   });
}

function getChapID(intBookID, intChapterNum) {
   console.log(intChapterNum);
   var intChapID = intBookID;
   if (intChapterNum.length === 1) {
      intChapID += "00" + intChapterNum;
   } else if (intChapterNum.length == 2) {
      intChapID += "0" + intChapterNum;
   }
   return intChapID;
}

listBooksView().then(function(d) {
   function listBookChapters(intBookID) {
      var chaps = 0;
      $(d.books).each(function() {
         if(this.ID === intBookID) {
            book =  this;
         }
      });
      var $chapHeader = $("<h5></h5>", {class: "bibleSection"});
      $chapHeader.html("CHAPTERS");
      $('#books').html($chapHeader);
      $('#pgTitle').html(book.Name);
      $('#back').show();
      for(var i = 1; i <= book.Chapters; i++) {
         $btnChap = $("<div></div>", {id: getChapID(book.ID, i), class: "btnSchedule"});
         $btnChap.html(i);
         $('#books').append($btnChap);
      }
      $('#books').append("<div id='checkAll' class='btnCheckAll'><span id='done' class='glyphicon glyphicon-ok'></span>ALL</div>")
      setClickEvents();
   }

   $('.btnBook').click(function(e) {
      listBookChapters(e.target.id);
   });
});