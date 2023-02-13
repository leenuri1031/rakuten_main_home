
/*goods list*/
$(document).ready(function(){
	if ($(window).width() < 768) {
		$("a.switcher").bind("click", function(e){
			e.preventDefault();

			var theid = $(this).attr("id");
			var theproducts = $("ul#list-box");
			var classNames = $(this).attr('class').split(' ');
			
			if($(this).hasClass("active")) {
				// if currently clicked button has the active class
				// then we do nothing!
				return false;
			} else {
				// otherwise we are clicking on the inactive button
				// and in the process of switching views!

				if(theid == "gridview") {
					$(this).addClass("active");
					$("#listview").removeClass("active");
					var path = $(this).children("img").attr("src");
					var dir = path.substring(0, path.lastIndexOf("/"));

					$("#listview").children("img").attr("src", dir + "/icon_list_non.svg");

					var theimg = $(this).children("img");
					theimg.attr("src", dir + "/icon_grid.svg");

					// remove the list class and change to grid
					theproducts.removeClass("list");
					theproducts.addClass("grid");
				}

				else if(theid == "listview") {
					$(this).addClass("active");
					$("#gridview").removeClass("active");
					var path = $(this).children("img").attr("src");
					var dir = path.substring(0, path.lastIndexOf("/"));

					$("#gridview").children("img").attr("src", dir + "/icon_grid_non.svg");

					var theimg = $(this).children("img");
					theimg.attr("src", dir + "/icon_list.svg");

					// remove the grid view and change to list
					theproducts.removeClass("grid")
					theproducts.addClass("list");
				} 
			}

		});
	}

	/*ページ内リンク*/
    if ($('a[href^="#narrow_link"]').length) {
        $('a[href^="#narrow_link"]').click(function() {
            var speed = 300;
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top - 130;
            $('body,html').animate({scrollTop:position}, speed, 'swing');
            return false;
        });
	}
});
