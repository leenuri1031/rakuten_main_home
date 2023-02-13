$(function(){
    $.ajax({
		type: 'GET',
        url: 'https://graph.facebook.com/v3.0/17841402078230658?fields=name%2Cmedia.limit(12)%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cusername%7D&access_token=EAAGVjlBT6ToBAIJTXOsbHQiSbkYOH5xZCR4deDcMyQB0BWpUjsbYjM3lZCumfZAeB7oFGurfs8n0zmGSZA4mnh66XI1JcDXEG50dQ6ZAZADfx43IEgzqGorNWXYTCaeJCn4Gn6ZAeL5nSMrpMqEDxldwxbFd9RO5rj4iJgnXbJEVw1ZAf563APbqwal71StRuYUZD',
        dataType: 'json',
        success: function(json) {
            var html = '';
            var insta = json.media.data;
            for (var i = 0; i < insta.length; i++) {
                html += '<div class="image"><a href="' + insta[i].permalink + '" target="_blank"><img src="' + insta[i].media_url + '"></a></div>';
            }
            $(".instagram").append(html);
        },
        error: function() {
		$(".instagram").text("loading...");
		}
	});
});