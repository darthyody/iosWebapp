var Bible = Bible || {};

Bible.books = {};

Bible.init = function() {
   $.getJSON('js/json/bibleBooks.json', function(d) {
      Bible.books = d.books;
   });
}

Bible.init();
