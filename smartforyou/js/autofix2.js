$(function(){
offset = $('.navi_bar').offset();		
$(window).scroll(function () {
if($(window).scrollTop() > offset.top) {
$(".navi_bar").css({"position":"fixed","top":"0px","left":"0px","width":"100%"});
} else {
$(".navi_bar").css("position","static");
}
});
});