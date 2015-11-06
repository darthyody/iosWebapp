function setProgressBar(aBooks) {
   var value = 0;
   var i = 0;
   $(aBooks).each(function() {
      i += this.Chapters;
   });
   var progress = JSON.parse(localStorage.getItem('progress'));
   var finished = progress.CompletedChapters.length;
   var progress = Math.round((finished / i) * 100);
   $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress).html(progress + '%');
}

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
         if (isBookFinished(this)) {
            addCompleteMarker($btnBook);
         }
         $btnBook.click(function(e) {
            listBookChapters(d, e, e.target.id);
         });
      });
      setProgressBar(d.books);
   });
}

function isBookFinished(book) {
   var progress = JSON.parse(localStorage.getItem('progress'));
   for (var i = 0; i < progress.CompletedChapters.length; i++) {
      var chapid = progress.CompletedChapters[i];
      var bookid = chapid.substring(0, 2);
      console.log(bookid);
   };
   return false;
}

function markAsComplete(object) {
      var savedProgress = JSON.parse(localStorage.getItem('progress'));
      if (!savedProgress) {
         savedProgress = initSaveProgress();
      }
      if (!isChapterComplete(object.id)) {
         savedProgress.CompletedChapters.push(object.id);
         localStorage.setItem('progress', JSON.stringify(savedProgress));
      }
      addCompleteMarker(object);
}

function addCompleteMarker(object) {
   $(object).addClass("complete");
   $(object).append("<span id='done' class='glyphicon glyphicon-ok'></span>");
}

function removeCompleteMarker(object) {
   $(object).removeClass("complete");
   $(object).children("span:first").remove();

   var savedProgress = JSON.parse(localStorage.getItem('progress'));
   var index = $.inArray(object.id, savedProgress.CompletedChapters);
   savedProgress.CompletedChapters.splice(index, 1);
   localStorage.setItem('progress', JSON.stringify(savedProgress));
}

function isChapterComplete(intChapID) {
   var savedProgress = JSON.parse(localStorage.getItem('progress'));
   var completeChapters = (savedProgress) ? savedProgress.CompletedChapters : [];
   return ($.inArray(intChapID, completeChapters) !== -1);
}

function initSaveProgress() {
   localStorage.clear();
   var progress = {};
   progress.StartDate = "November 3, 2015";
   progress.CompletedChapters = [];
   return progress;
}

function getChapID(intBookID, intChapterNum) {
   var intChapID = "";
   if (intChapterNum.toString().length === 1) {
      intChapID = intBookID + "00" + intChapterNum.toString();
   } else if (intChapterNum.toString().length === 2) {
      intChapID = intBookID + "0" + intChapterNum.toString();
   } else if (intChapterNum.toString().length === 3) {
      intChapID = intBookID + intChapterNum.toString();
   }
   return intChapID;
}

function listBookChapters(d, e, intBookID) {
   var chaps = 0;
   $(d.books).each(function() {
      if(this.ID === intBookID) {
         book = this;
      }
   });
   var $chapHeader = $("<h5></h5>", {class: "bibleSection"});
   $chapHeader.html("CHAPTERS");
   $('#books').html($chapHeader);
   $('#pgTitle').html(book.Name);
   $('#back').show();
   for(var i = 1; i <= book.Chapters; i++) {
      var id = getChapID(book.ID, i)
      $btnChap = $("<div></div>", {id: id, class: "btnSchedule"});
      $btnChap.html(i);
      $('#books').append($btnChap);
      if (isChapterComplete(id)) {
         addCompleteMarker($btnChap);
      }
      $($btnChap).click(function(e) {
         if (!isChapterComplete(e.target.id)) {
            markAsComplete(e.target);
            setProgressBar(d.books);
         } else {
            removeCompleteMarker(this);
         }
      });
   }
   $('#books').append("<div id='checkAll' class='btnCheckAll'><span id='done' class='glyphicon glyphicon-ok'></span>ALL</div>")
   $("#checkAll").click(function(e) {
      $('.btnSchedule').each(function() {
         markAsComplete(this);
         setProgressBar(d.books);
      });
   });
}

function init() {
   listBooksView();
}

init();