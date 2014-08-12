var all_topics = ["astronomy", "geology", "gyroscope", "literature", "marketing", "mathematics", "music", "polit", "agrobiologia", "law", "psychology", "geography", "physics", "philosophy", "chemistry", "estetica"];
		var yandex_vesna_url = 'http://vesna.yandex.ru/referats/?t=';
		function generate_text(topics){
			if (topics==undefined) {
				topics = all_topics
			}
			$.ajax({
				url: yandex_vesna_url + '?t=' + topics.join('+'), 
				success: function(data){
					var html = $(data).find('.referats__text')
					var title = html.find('strong').text();
					var body = [];
					html.find('p').each(function(i, el){
						body.push('<p>' + $(el).text() + '</p>');
					})
					referat = {
						title:title,
						topics:topics,
						body: body.join('')
					}
					render_text(referat)
				}})
		}
		function render_text(referat){
			$content = $('.content');
			_html = ['<h1>', referat.title, '</h1>', referat.body]
			$content.html(_html.join(''))
		}
		$(function(){
			$('#reload').on('click', function(){
				generate_text(all_topics)
			});
			generate_text()
		})