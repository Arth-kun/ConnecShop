// Fonction de hiding du menu
$(document).ready(function () {
	$('body').on('click', '#menu-toggle-button', function () {
		if (!$(this).hasClass('is-opened')) {
			$(this).addClass('is-opened').removeClass('is-closed');
			$('#menu-panel').addClass('opened');
		} else {
			$('#menu-toggle-button').addClass('is-closed').removeClass('is-opened');
			$('#menu-panel').removeClass('opened');
		}

	});

	$('body').on('click', '#menu-panel .menu-button', function () {
		if ($('#menu-toggle-button').hasClass('is-opened')) {
			$('#menu-toggle-button').addClass('is-closed').removeClass('is-opened');
			$('#menu-panel').removeClass('opened');
		}
	});

});