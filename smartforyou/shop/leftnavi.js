$(document).ready(function() {
	
	$(".accordionbox dt").on('click', function () {

    if ($(this).hasClass('active')) {
		$(this).children(".accordion_icon").removeClass('active');
		slideUp();
    } else {
        slideUp();
		removeClass();
		$(this).children(".accordion_icon").addClass('active');
        $(this).addClass('active').next().slideDown();
    }
    function slideUp() {		
        $('dt').removeClass('active').next().slideUp();
    };
	function removeClass() {		
        $('p').removeClass('active');
    };
})
	
	
	
	
	
	//アコーディオン
	// if ($(".accordionbox dt").length) {
	//	$(".accordionbox dt").on("click", function() {
	//		
	//		$(this).next().slideToggle();	
	//		// activeが存在する場合
	//		if ($(this).children(".accordion_icon").hasClass('active')) {$(this).children(".accordion_icon").removeClass('active');	}
	//			else {$(this).children(".accordion_icon").addClass('active'); }
	//	});
	// }
	


});

