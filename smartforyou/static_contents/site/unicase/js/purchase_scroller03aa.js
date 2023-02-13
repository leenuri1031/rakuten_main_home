console = {};
console.log = function(o){return;};

function PurchaseScroller(){
	//JSONのURL
	this.jsonUrl = "";
	//親要素のJQオブジェクト
	this.jqParent = null;
	//親要素のサイズ
	this.innerWidth = 0;
	//ITEMの切り替え時間
	this.rotateTime = 2000;
	//最初に表示するITEM数
	this.maxItemCount = 50;
	//最大待ちカウント
	this.maxWait = 5;
}

PurchaseScroller.prototype.setParent = function(str) {
	this.jqParent = $(str);
}

PurchaseScroller.prototype.setJsonUrl = function(str){
	this.jsonUrl = str;
}

PurchaseScroller.prototype.setMaxItemCount = function(i){
	this.maxItemCount = i;
}

PurchaseScroller.prototype.setRotateTime = function(i){
	this.rotateTime = i;
}

PurchaseScroller.prototype.setMaxWait = function(i){
	this.maxWait = i;
}


PurchaseScroller.prototype.execute = function(){;
	
	var classObj = this;
	
	var jq_inner = classObj.makeJqInner();
	

	$.getJSON(classObj.jsonUrl,function(json){

		if (json.length　< this.maxItemCount) {
			classObj.setParent(json.length);
		}
		
		console.log(json);
		
		for (var i=0; i<json.length; i++) {
			
			//JQUER アイテムを作成
			var jq_item = classObj.makeJqItem(json[i]);
			//アイテムオブジェクトのカスタマイズ
			
			//INNERに追加
			jq_inner.append(jq_item);
		}
		
		//親要素に追加
		classObj.jqParent.append(jq_inner);
		
		//子要素を取得
		var jq_items = jq_inner.children();
		
		for (var z=0; z<jq_items.size(); z++) {
			
			//アイテムを取得
			var jq_item = jq_items.eq(z);
			
			//一種アイテムがすべて表示されてしまう減少防止
			jq_item.css("visibility","hidden");
			
			//横幅全体を取得
			var item_all_width = classObj.getAllWidth(jq_item);
			
			//innerの幅
			classObj.innerWidth += item_all_width;
		}
		
		//一旦横幅を設定(レイアウト崩れ防止)
		jq_inner.width(classObj.innerWidth);
		
		
		//画像の読み込みを待って高さを確定させる
		jq_inner.find("img").filter(":last").bind('load',function(){
			
			var max_height = 0;
			
			for (var z=0; z<jq_items.size(); z++) {
				
				var jq_item = jq_items.eq(z);
				
				
				//高さを取得
				var item_height = jq_item.height();
				
				//横幅全体を取得
				var item_all_width = classObj.getAllWidth(jq_item);
				
				
				//最大の高さを取得
				if ( max_height < item_height) {
					max_height = item_height;
				}
				
				if (z >= classObj.maxItemCount) {
					//アイテム非表示
					jq_item.hide();
					
					//innerの幅をアイテム分減少させる
					classObj.innerWidth -= item_all_width;
				}
				jq_item.css("visibility","visible");
			}
			
			//アイテムに高さを設定
			jq_items.height(max_height);
			
			//innnerの横幅を再設定
			jq_inner.width(classObj.innerWidth);
			
			//待ちカウントをランダム生成
			var waitCount = Math.floor( Math.random() * classObj.maxWait);
			
			setInterval(function(){
				
				if (waitCount == 0) {
					//待ちカウントをランダム生成
					waitCount = Math.floor( Math.random() * classObj.maxWait);
					
					var jq_items = jq_inner.children();
					
				
					//最後の表示アイテム関連
					var jq_vis_last_item = jq_items.eq(classObj.maxItemCount -1);
					var jq_vis_item_all_width = classObj.getAllWidth(jq_vis_last_item);
				
				
					//最後のアイテム関連
					var jq_last_item = jq_items.eq(jq_items.size() - 1);
					var jq_item_all_width = classObj.getAllWidth(jq_last_item);
					var l_height = jq_last_item.height();
					classObj.innerWidth += jq_item_all_width;
				
					jq_inner.width(classObj.innerWidth);
				
				
					//子要素を非表示にする
					jq_last_item.children().hide();
					jq_inner.prepend(jq_last_item);
				
					//アニメーション開始
					jq_last_item.animate(
						{width:"toggle",height:l_height},
						{duration: 500,complete:function(){
							setTimeout(function(){
								
								jq_vis_last_item.hide(300,function(){
									classObj.innerWidth -= jq_vis_item_all_width;
									jq_inner.width(classObj.innerWidth);
								});
							
								jq_last_item.children().eq(0).show(300);
							},200);
					}});
					
				} else {
					waitCount--;
				}
				
				
				
				
			//},Math.floor(Math.random()*20000+5000));
			},classObj.rotateTime);
		});
		
	});
}

/**
inner要素を作成する。
@return Jqueryオブジェクト
*/
PurchaseScroller.prototype.makeJqInner = function(){
	return $("<div class=\"inner\"></div>");
}

/**
 * スマートフォンかどうか確認する
 *
 * @return {@code true} スマートフォン, {@code false} スマートフォン以外
 */
PurchaseScroller.prototype.isSmartPhone = function() {
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 ||
            (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
        return true;
    }
    return false;
}

/**
アイテム要素の作成
@param Jsonのレコード
@return Jqueryオブジェクト
*/
PurchaseScroller.prototype.makeJqItem = function(json_record){
    var url = json_record["goods_image_url"];
    //if (! this.isSmartPhone()) {
        url = url.replace('_90\.', '_140.');
    //}
	var html = "";
		html += "<div class=\"item\">";
		html += "<a class=\"inner\" href=\"" + json_record["goods_detail_url"] + "\">";
		html += "<div class=\"image\">";
		html += "<img src=\"" + url + "\" width=\"200\" />";
		html += "</div>";
		html += "<div class=\"state\">";
		html += "<span class=\"city\">";
		html += json_record["from_address1"];
		html += "</span>";
		html += "<span class=\"price\">";
		html += "¥" + json_record["selling_price"];
		html += "</span>";
		html += "</div>";
		html += "<div class=\"name\">";
		html += json_record["goods_name"];
		html += "</div>";
		html += "</a>";
		html += "</div>";
		return $(html);
}


/**
Padding Marginを含めた横幅を取得する。
@param Jqueryオブジェクト
@return 横幅
*/
PurchaseScroller.prototype.getAllWidth = function(jq_item){
	var all_width = 0;
	
	all_width += jq_item.width();
	all_width += this.getPix(jq_item.css("margin-right"));
	all_width += this.getPix(jq_item.css("margin-left"));
	all_width += this.getPix(jq_item.css("padding-right"));
	all_width += this.getPix(jq_item.css("padding-left"));
	all_width += this.getPix(jq_item.css("border-left-width"));
	all_width += this.getPix(jq_item.css("border-right-width"));
	return all_width+3;
}
PurchaseScroller.prototype.getPix = function(size){
	var iSize = 0;
	if (size != 'auto') {
		iSize = parseInt(size,10);
	}
	return iSize;
}


$(function(){
		//purchaseScroller();
		
		var ps = new PurchaseScroller();
		ps.setParent(".purchase_scroller");
		ps.setJsonUrl("/static_contents/json/unicase_last_order.json");
		ps.setMaxItemCount(50);
		ps.setRotateTime(2000);
		ps.setMaxWait(5);
		ps.execute();
		
	
});

