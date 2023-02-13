
/*narrow*/


$(document).ready(function(){
  $('.sp_nav_open').click(function(){
	$('.sp_nav_box').addClass('sp_nav_o');
	$('.sp_nav_close').removeClass('sp_nav_hidden');
	$('.sp_nav_open').addClass('sp_nav_hidden');
  });
});

$(document).ready(function(){
  $('.sp_nav_close').click(function(){
	$('.sp_nav_box').removeClass('sp_nav_o');
	$('.sp_nav_open').removeClass('sp_nav_hidden');
	$('.sp_nav_close').addClass('sp_nav_hidden');
  });
});


