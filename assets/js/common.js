(function($) {
	$(function() {

		var root = location.protocol + '//' + location.host;
		$('a').not(':contains(root)').click(function(){
			this.target = "_blank";
		});

		var	$window  = $(window),
				$body	   = $('body'),
				$menu	   = $('#menu'),
				$sidebar = $('#sidebar'),
				$main 	 = $('#main');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', () => {
			$body.removeClass('is-loading');
		});

		// header search form
		var $search   = $('.search'),
		$search_icon  = $search.find('i'),
		$search_form	= $search.find('form'),
		$search_input = $search.find('input');

		$body.on('click', '[href="#search"]', (e) => {
			e.preventDefault();
			if (!$search_form.hasClass('visible')) {
				$search_form[0].reset();
				$search_form.addClass('visible');
				$search_icon.addClass('');
				$search_input.focus();
			}
		});

		$search_input.on('keydown', (e) => {
			e.preventDefault();
			if ((e.keyCode === 13 || e.which === 13) && $search_input.val().length === 0)
				$search_input.blur();
				return false;
			})
			.on('blur', () => {
				$search_form.removeClass('visible');
		});
	});
})(jQuery);
