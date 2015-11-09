var Bible = Bible || {};

Bible.books = {};

Bible.init = function() {
   $.getJSON('js/json/bibleBooks.json', function(d) {
      Bible.books = d.books;
   });
}

Bible.isChapterComplete = function(intChapID) {
   return ($.inArray(intChapID, Progress.CompletedChapters) !== -1);
}

Bible.getChapID = function(intBookID, intChapterNum) {
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

Bible.getBook = function(intBookID) {
   $(Bible.books).each(function() {
      if(this.ID === intBookID) {
         book = this;
      }
   });
   return book;
}

Bible.listBookChapters = function(e) {
   var book = Bible.getBook(e.target.id);
   var $chapHeader = $("<h5></h5>", {class: "bibleSection"});
   $chapHeader.html("CHAPTERS");
   $('#books').html($chapHeader);
   $('#pgTitle').html(book.Name);
   Bible.addBackBtn();
   for(var i = 1; i <= book.Chapters; i++) {
      Bible.addChapterBtn(book, i);
   }
   Bible.addCompleteAllBtn();
}

Bible.addChapterBtn = function(book, intChapter) {
   console.log(book, intChapter);
   var id = Bible.getChapID(book.ID, intChapter)
   $btnChap = $("<div></div>", {id: id, class: "btnSchedule"});
   $btnChap.html(intChapter);
   $('#books').append($btnChap);
   if (Bible.isChapterComplete(id)) {
      Bible.addCompleteMarker($btnChap);
   }
   $($btnChap).click(function(e) {
      if (!Bible.isChapterComplete(e.target.id)) {
         Bible.markAsComplete(e.target);
         Progress.updateBar(Bible.books);
      } else {
         Bible.removeCompleteMarker(this);
         Progress.updateBar(Bible.books);
      }
   });
}

Bible.addBackBtn = function() {
   var $arrowIcon = $("<span></span", {id: "done", class: "glyphicon glyphicon-chevron-left"});
   var $backBtn = $("<div></div>", {id: "checkAll", class: "btnCheckAll"});
   $backBtn.append($arrowIcon);
   $backBtn.css('background-color', '#9b9b9b');
   $('#books').append($backBtn);
   $backBtn.click(function(e) {
      $('#main').load('schedule.html', function() {
         Bible.listBooksView();
      });
   });
}

Bible.addCompleteAllBtn = function() {
   var $chkIcon = $("<span></span", {id: "done", class: "glyphicon glyphicon-ok"});
   var $chkAll = $("<div></div>", {id: "checkAll", class: "btnCheckAll"});
   $chkAll.append($chkIcon)
   $chkAll.append("ALL");
   $('#books').append($chkAll);
   $chkAll.click(function(e) {
      $('.btnSchedule').each(function() {
         Bible.markAsComplete(this);
         Progress.updateBar(Bible.books);
      });
   });
}

Bible.listBooksView = function() {
   var $hbrHeading = $("<h5></h5>", {class: "bibleSection"});
   $hbrHeading.html("HEBREW-ARAMAIC SCRIPTURES");
   $('#books').append($hbrHeading);
   $(Bible.books).each(function() {
      var $btnBook = $("<div></div>", {id: this.ID, class: "btnBook"});
      $btnBook.html(this.Abbr);
      $btnBook.css({"background-color": this.Color});
      $('#books').append($btnBook);
      if (this.ID === "39") {
         var $grkHeading = $("<h5></h5>", {class: "bibleSection"});
         $grkHeading.html("CHRISTIAN GREEK SCRIPTURES");
         $('#books').append($grkHeading);
      }
      $btnBook.click(function(e) {
         Bible.listBookChapters(e);
      });
   });
   Progress.updateBar(Bible.books);
}

Bible.markAsComplete = function(object) {
   if (!Bible.isChapterComplete(object.id)) {
      Bible.addCompleteMarker(object);
      Progress.addChapter(object.id);
      Progress.save();
   }
}

Bible.addCompleteMarker = function(object) {
   $(object).addClass("complete");
   $(object).append("<span id='done' class='glyphicon glyphicon-ok'></span>");
}

Bible.removeCompleteMarker = function(object) {
   $(object).removeClass("complete");
   $(object).children("span:first").remove();

   Progress.removeChapter(object.id);
   Progress.save();
}