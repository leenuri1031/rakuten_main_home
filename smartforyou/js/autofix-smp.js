$(function(){
offset = $('#sp_nav').offset();		
$(window).scroll(function () {
if($(window).scrollTop() > offset.top) {
$("#sp_nav").css({"position":"fixed","top":"0px","left":"0px","width":"100%"});
} else {
$("#sp_nav").css("position","static");
}
});
});