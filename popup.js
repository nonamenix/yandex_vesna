var all_topics = ["astronomy", "geology", "gyroscope", "literature", "marketing", "mathematics", "music", "polit", "agrobiologia", "law", "psychology", "geography", "physics", "philosophy", "chemistry", "estetica"];
var copy_with_html = false;
var show_slug = true;
var yandex_vesna_url = 'http://vesna.yandex.ru/referats/?t=';

function generate_text(topics){
	if (topics==undefined) {
		topics = all_topics
	}
	$.ajax({
		url: yandex_vesna_url + '?t=' + topics.join('+'), 
		success: function(data){
			var html = $(data).find('.referats__text')

			var title = html.find('strong').text().replace('Тема: «', '').replace('»', '');
			var html_title = ['<h1 class="title" title="Кликни чтобы скопировать заголовок">', title, '</h1>'].join('')
			
			var body = []
			var html_body = ['<div class="body" title="Кликни чтобы скопировать текст">'];
			html.find('p').each(function(i, el){
				var text = $(el).text()
				html_body.push('<p>' + text + '</p>');
				body.push(text)
			})
			html_body.push('</div>');

			var slug = slugify(title);
			var html_slug = ['<p class="slug-wrapper">url: <span class="slug">', slug, '</span></p>'].join('')
			referat = {
				html_title: html_title,
				title: title,
				slug: slug,
				html_slug: html_slug,
				topics: topics,
				body: body.join('\n'),
				html_body: html_body.join('')
			}
			render_text(referat);
			return false;
		}})
}
function render_text(referat){
	$content = $('.content');
	
	_html = [referat.html_title]
	if (show_slug) {
		_html.push(referat.html_slug)
	}
	
	_html.push(referat.html_body)
	
	$content.html(_html.join(''))

	$('.title').on('click', function(){		
		copyToClipboard(referat.title);
	})
	$('.body').on('click', function(){
		copyToClipboard(referat.body);
	})
	$('.slug').on('click', function(){		
		copyToClipboard(referat.slug);
	})
}

function copyToClipboard( text ){
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
}

$(function(){
	$('.tips').hide();
	$('#reload').on('click', function(){
		generate_text(all_topics);
	});
	generate_text();
})







