
/*narrow*/


$(document).ready(function(){
  $('.narrow_open').click(function(){
	$('.narrow_open').addClass('narrow_h');
	$('.narrow_close').removeClass('narrow_h');
	/*$('.narrow_m').removeClass('narrow_h');*/
	$('.narrow_c').removeClass('narrow_h');
  });
});

$(document).ready(function(){
  $('.narrow_close').click(function(){
	$('.narrow_open').removeClass('narrow_h');
	$('.narrow_close').addClass('narrow_h');
	/*$('.narrow_m').addClass('narrow_h');*/
	$('.narrow_c').addClass('narrow_h');
  });
});

$(document).ready(function(){
  $('#narrow_tab_open').click(function(){
	$('.narrow_o').addClass('narrow_tab_auto');
	$('#narrow_tab_close').removeClass('n_tab_hidden');
	$('#narrow_tab_open').addClass('n_tab_hidden');
  });
});

$(document).ready(function(){
  $('#narrow_tab_close').click(function(){
	$('.narrow_o').removeClass('narrow_tab_auto');
	$('#narrow_tab_close').addClass('n_tab_hidden');
	$('#narrow_tab_open').removeClass('n_tab_hidden');
  });
});

$(document).ready(function(){
  $('#narrow_tab2_open').click(function(){
	$('.narrow_c').addClass('narrow_tab_auto');
	$('#narrow_tab2_close').removeClass('n_tab_hidden');
	$('#narrow_tab2_open').addClass('n_tab_hidden');
  });
});

$(document).ready(function(){
  $('#narrow_tab2_close').click(function(){
	$('.narrow_c').removeClass('narrow_tab_auto');
	$('#narrow_tab2_close').addClass('n_tab_hidden');
	$('#narrow_tab2_open').removeClass('n_tab_hidden');
  });
});



