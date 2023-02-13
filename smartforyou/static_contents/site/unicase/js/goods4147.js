
/*goods_img*/

function sImage(sImageURL){
     document.images["lImage"].src = sImageURL;
}

$(document).ready(function(){
	$(".review_disp_all").click(function(){
		$(this).prev().animate({"height": "100%"}, 1000);
		$(this).animate({"opacity": "hide"}, 500);
	});

});


$(document).ready(function(){
	if ($(window).width() > 768) {
		$("#zoom").elevateZoom({
			zoomWindowFadeIn: 800,
			zoomWindowFadeOut: 800,
			lensFadeIn: 800,
			lensFadeOut: 800,
			zoomWindowWidth: 600,
			zoomWindowHeight: 600
		});
	} else {
    }
});

//カートボタン fixed
$(function() {	
	//ボタン表示スクリプト
	if ($(window).width() < 768) {
		var goodscart = $('.cart-btn-fixed');
		goodscart.css({'display': 'none'});
		$(window).scroll(function () {
			if ($(this).scrollTop() > 500) {
				goodscart.fadeIn();
			} else {
			goodscart.fadeOut();
			}
		});
	}
});