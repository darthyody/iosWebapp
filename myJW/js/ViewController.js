var View = View || {};

View.init = function() {
	Bible.init();
	Schedule.init();
	Progress.init();

	Page.displayPage();
	$(window).on('hashchange', function() {
	   Page.displayPage();
	});
}

View.init();