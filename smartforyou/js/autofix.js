// JavaScript Document

// 현재 스크롤바의 위치를 저장하는 변수 (px)
var currentScrollTop = 0;
     
// 비동기식 jQuery이므로 window load 후 jQuery를 실행해야 함
window.onload = function() {
    // 새로고침 했을 경우를 대비한 메소드 실행
    scrollController();
     
    // After Scrool
    $(window).on('scroll', function() {
        scrollController();
    });
}
     
//Menu Position
function scrollController() {
    currentScrollTop = $(window).scrollTop();
    if (currentScrollTop < 100) {
        $('#shop-title').css('top', -(currentScrollTop));
        $('#menu').css('top', 100-(currentScrollTop));
        if ($('#menu').hasClass('fixed')) {
            $('#menu').removeClass('fixed');
            $('#menu .menu-name').removeClass('on');
        }
    } else {
        if (!$('#menu').hasClass('fixed')) {
            $('#shop-title').css('top', -100);
            $('#menu').css('top', 0);
            $('#menu').addClass('fixed');
            $('#menu .menu-name').addClass('on');
        }
    }
}