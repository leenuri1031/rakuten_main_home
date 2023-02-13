$(document).ready(function() {
	// ヘッダー固定
	$(function() {
	  var $win = $(window),
		  $header = $('header'),
		  animationClass = 'is-fixed';

	  $win.on('load scroll', function() {
		var value = $(this).scrollTop();
		if ( value > 10 ) {
		  $header.addClass(animationClass);
		} else {
		  $header.removeClass(animationClass);
		}
	  });
	});
	//ページ内リンクのヘッダーのズレ
	$(function(){
	var headerHight = 50; //ヘッダの高さ
	/*ページ内＃リンク*/
		$('a[href^=#]').click(function(){
				var href= $(this).attr("href");
				var target = $(href == "#" || href == "" ? 'body' : href);
				var position = target.offset().top-headerHight; //ヘッダの高さ分位置をずらす
				$("html, body").animate({scrollTop:position}, 500, "swing");
				return false;
		});
 	/*ページ外＃リンク*/ 
	var headerHeight = 100;
	var url = $(location).attr('href');
	  if(url.indexOf("?id=") != -1){
		var id = url.split("?id=");
		var $target = $('#' + id[id.length - 1]);
		if($target.length){
		  var pos = $target.offset().top-headerHeight;
		  $("html, body").animate({scrollTop:pos}, 500);
		}
		}
	});
	// スマホヘッダーメニューボタン切り替え
    if ($("#menuButton").length) {
        $("#menuButton").click(function() {
            $(this).toggleClass("active"); //メニューボタンの切り替え

            // メニューの開閉
            if ($(this).hasClass("active")){
                $("body").css("oveflow", "hidden");
                $("aside").show().animate({"right": "0%"}, 400);
            } else {
                $("body").animate({"right": 0}, 400);
                $("aside").show().animate({"right": "100%"}, 400, function(){
                    $("aside").hide();
                    $("body").css("oveflow", "visible");
                });
            }
            return false;
        });
     }
	//アコーディオン
	 if ($(".accordionbox dt").length) {
		$(".accordionbox dt").on("click", function() {
			$(this).next().slideToggle();	
			// activeが存在する場合
			if ($(this).children(".accordion_icon").hasClass('active')) {			
				// activeを削除
				$(this).children(".accordion_icon").removeClass('active');
			}
			else {
				// activeを追加
				$(this).children(".accordion_icon").addClass('active');	
			//else {
				//$(this).children(".accordionlist").hasClass('open');
               // $("accordion_icon dd").css("display", "block");
			}
		});
	 }
	$(function() {
		$('.side-menu .accordionlist.open > dt > p, .category_narrow_b .accordionlist > dt > p').addClass('active');
		$('.side-menu .accordionlist.open > dd, .category_narrow_b .accordionlist > dd').show();
	});

	//ページトップに戻る
	$(function() {
		//ボタン表示スクリプト
		var pagetop = $('.pagetop');
		pagetop.css({'display': 'none'});
		$(window).scroll(function () {
			if ($(this).scrollTop() > 500) {
				pagetop.fadeIn();
			} else {
			pagetop.fadeOut();
			}
		});
		//トップに戻るスクリプト
		pagetop.click(function () {
			$('html,body').animate({scrollTop: 0}, 500, 'swing');
			return false;
		});
	});
});


/*リサイズ時のイベントを追加する。*/
function addResizeEvent (callback) {
	
	var beforeSizeMode = getSizeMode();
	
	callback(beforeSizeMode);
	
	$(window).bind("resize",function(){
		
		
		var sizeMode =  getSizeMode();
		
		if (beforeSizeMode !=  sizeMode) {
			
			callback(sizeMode);
			
			beforeSizeMode =  sizeMode;
		}
	});
	
	
	function getSizeMode () {
		var inputSize = window.innerWidth;
		
		if (!inputSize) {
			inputSize = $(window).width();
		}
		
		
		if (inputSize < 601) {
			return "smart_phone";
		} else if (inputSize > 1280) {
			return "small_pc";
		} else if (inputSize > 1480) {
			return "middle_pc";
		} else if (inputSize > 1680) {
			return "large_pc";
		} else {
			return "pc";
		}
	}
}


function getScriptDirPath (file_name) {
	var re = null;
	$('script').each(function(){
							  
		var path = $(this).attr('src');
		
		
		if (path != null) {
			var b = String(path).match('(.*)\\/' + file_name + '\\/?$');
		
		
			if (b != null) {
				re = b[1];
			}
		}
		
	});
	return re;
}


function getParentPath (path) {
	var re = path;
	if (path != null) {
		var b = String(path).match('(.*)\\/[^\\/]+\\/?$');
	
		if (b != null) {
		path= b[1];
		}
	}
	return path;
}