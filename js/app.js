$(function(){

	$('#search-box').submit(function(){

		event.preventDefault();
		searchTerm = $('#query').val();
	
		getRequest();//asynchronous

	});
});

var searchTerm = "";

function getRequest() {

	params = {
		part: 'snippet',
		key: 'AIzaSyCG21WU-MRCDS_GG6QzS89twkWP9aYN6g0',
		q: searchTerm
	};
	url = 'https://www.googleapis.com/youtube/v3/search';
	
	$.getJSON(url, params, function(data){
		showResults(data.items);

		$('img')

		.css('cursor', 'pointer')
		.css('margin', '1em 0em')
		.click(function(){
		
			watch(this.id);
		});
	});
}

function showResults(results) {

	var html = "";
	
	$.each(results, function(index, value){
		
		html += '<img src="' + value.snippet.thumbnails.high.url + '" id="' + value.id.videoId + '"><br>'
		console.log(value.snippet.thumbnails.high.url);
	});
	console.log(html);
	$('#search-results').html(html);
}

function watch(id) {

	console.log(id);
	location.href = 'https://www.youtube.com/watch?v=' + id;
	window.open(location.href);
	/*$('#'+ id).attr('href', watchUrl);*/
}