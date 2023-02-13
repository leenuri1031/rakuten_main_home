///////////////////////////////////////////////////////////////
//
// Call Class
//
///////////////////////////////////////////////////////////////

$(function() {
    $('.menu_icon').toggleMenu();
});



;(function($) {

///////////////////////////////////////////////////////////////
//
// Toggle Menu
//
///////////////////////////////////////////////////////////////

    $.fn.toggleMenu = function() {
        var isTouch = ('ontouchstart' in window);
        var menuflag = false;
		var $menuIcon = $('.menu_icon')
        var $globalNav = $('.global_nav');
        if(isTouch) {
            $(this).on('touchstart', touchstartHandler);
            $('.close-btn').on('touchstart', touchstartHandler);
        } else {
            $(this).on('mousedown', touchstartHandler);
            $('.close-btn').on('mousedown', touchstartHandler);
        }

        function touchstartHandler() {
            if(menuflag === false) {
				setTimeout(function() {
				$menuIcon.addClass('show');
                $globalNav.addClass('show');
                menuflag = true;
				}, 100);
            } else {
				setTimeout(function() {
                $menuIcon.removeClass('show');					
                $globalNav.removeClass('show');
                menuflag = false;
				}, 200);
            }
        }
    }


})(jQuery);


