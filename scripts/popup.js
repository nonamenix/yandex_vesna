
$(function(){
	vesna_options = {topics:['gyroscope', 'geology'], debug: true};
	$('.content').vesna(vesna_options);
	$('#reload').on('click', function(){
		$('.content').vesna(vesna_options);
	});
})









