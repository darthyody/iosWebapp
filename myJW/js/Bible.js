var Bible = Bible || {};

Bible.books = {};

Bible.init = function() {
   $.getJSON('js/json/bibleBooks.json', function(d) {
      Bible.books = d.books;
   });
}

Bible.init();

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

Bible.getBookName = function(aBooks, intBookID) {
   for (var i = 0; i < aBooks.length; i++) {
      if (aBooks[i].ID === intBookID) {
         return aBooks[i].Name;
      }
   }
}

Bible.listBookChapters = function(e) {
   var chaps = 0;
   $(Bible.books).each(function() {
      if(this.ID === e.target.id) {
         book = this;
      }
   });
   var $chapHeader = $("<h5></h5>", {class: "bibleSection"});
   $chapHeader.html("CHAPTERS");
   $('#books').html($chapHeader);
   $('#pgTitle').html(book.Name);
   $('#back').show();
   for(var i = 1; i <= book.Chapters; i++) {
      var id = Bible.getChapID(book.ID, i)
      $btnChap = $("<div></div>", {id: id, class: "btnSchedule"});
      $btnChap.html(i);
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
         }
      });
   }
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
   $('#back').hide();
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
      Progress.addChapter(object.id);
      Progress.save();
   }
   Bible.addCompleteMarker(object);
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