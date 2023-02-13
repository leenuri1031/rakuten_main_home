
//For Recommend item
	$(function(){
	     $(".rec1-sub").hide();
		 $(".rec1 li").hover(function(){
		    $("ul:not(:animated)",this).slideDown("slow");
			},
			function(){
			   $("ul",this).slideUp("past");
			});
      });	
	  
//For Category List	  
	$(function(){
	     $(".cate-list li ul").hide();
		 $(".cate-list li").hover(function(){
		    $("ul:not(:animated)",this).slideDown("past");
			},
			function(){
			   $("ul",this).slideUp("slow");
			});
      });	
	  
//For New Arrival item  
	$(function(){
	     $(".new-sub").hide();
		 $(".new li").hover(function(){
		    $("ul:not(:animated)",this).slideDown("slow");
			},
			function(){
			   $("ul",this).slideUp("past");
			});
      });		  