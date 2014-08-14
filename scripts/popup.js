(function ( $ ) {
	var all_topics, yandex_vesna_url, settings, debug, methods, insert_to;
	
	all_topics = ["astronomy", "geology", "gyroscope", "literature", "marketing", "mathematics", "music", "polit", "agrobiologia", "law", "psychology", "geography", "physics", "philosophy", "chemistry", "estetica"];
	yandex_vesna_url = 'http://vesna.yandex.ru/referats/?t=';
	settings = {
		copy_with_html: false,
		show_slug: true,
		topics: all_topics,
		debug: false, 
		autoload: true
	}
	debug = function(){
		if(window.console && settings.debug ){
			console.log('vesna:', Array.prototype.slice.call(arguments));
		}
	};

	methods = {
		init: function(insert_to_element, options){
			$('.tips').hide();

			insert_to = insert_to_element;
			settings = $.extend(settings, options);
			if (settings.autoload){
				methods.generateText(settings.topics, methods.renderText);	
			}
			
			
		},
		
		renderText: function(referat){
			var html, $content, html_title, html_body, html_slug;
			$content = $(insert_to);
			
			html_title = ['<h1 class="title" title="Кликни чтобы скопировать заголовок">', referat.title, '</h1>'].join('');
			html_body = ['<div class="body" title="Кликни чтобы скопировать текст">'];
			$.each(referat.paragraphs, function(i, p){
				html_body.push('<p>' + p + '</p>');
			})
			html_body.push('</div>');
			html_slug = ['<p class="slug-wrapper" title="Кликни чтобы скопировать url">url: <span class="slug">', referat.slug, '</span></p>'].join('');

			html = [html_title]
			if (settings.show_slug) {
				html.push(html_slug);
			}
			html.push(html_body.join(''));
			
			$content.html(html.join(''));

			$('.title, .body, .slug').on('click', function(){		
				var class_name = this.className;
				debug('copy ' + class_name + ' to copy to clipboard');
				methods.copyToClipboard(referat[class_name]);			
			})
		},

		copyToClipboard: function(text){
			var copyDiv = document.createElement('div');
			copyDiv.contentEditable = true;
			document.body.appendChild(copyDiv);
			copyDiv.innerHTML = text;
			copyDiv.unselectable = "off";
			copyDiv.focus();
			document.execCommand('SelectAll');
			document.execCommand("Copy", false, null);
			document.body.removeChild(copyDiv);
			$('.tips').fadeIn(300, function(){
				$this = $(this)
				setTimeout(function(){
					$this.fadeOut(300);
				}, 1000)		
			});
		},
		generateText: function(topics, callback){
			var uri = yandex_vesna_url + topics.join('+');
			debug('request to yandex.referats', uri);
			$.ajax({
				url: uri,
				success: function(data){
					var html, title, paragraphs, slug;										
					html = $(data).find('.referats__text');
					title = html.find('strong').text().replace('Тема: «', '').replace('»', '');
					slug = slugify(title);
					
					paragraphs = []					
					html.find('p').each(function(i, el){
						var text = $(el).text()
						paragraphs.push(text)
					})
					
					callback({
						title: title,
						slug: slug,
						topics: topics,
						paragraphs: paragraphs
					});
				}
			})
		}
	}

	$.fn.vesna = function( options ) {		
		methods.init(this[0], options);
		return this;
	};
}( jQuery ));

$(function(){
	vesna_options = {topics:['gyroscope', 'geology'], debug: true};
	$('.content').vesna(vesna_options);
	$('#reload').on('click', function(){
		$('.content').vesna(vesna_options);
	});
})









