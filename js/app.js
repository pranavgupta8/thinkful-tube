$(function(){
	
	$('#toggle').hide();

	$('#search-box').submit(function(){

		event.preventDefault();
		searchTerm = $('#query').val();
	
		getRequest();//asynchronous

	});

});

var searchTerm = "";;var page = "";
var nextPage = "";
var prevPage = "";

function getRequest() {

	params = {
		part: 'snippet',
		key: 'AIzaSyCG21WU-MRCDS_GG6QzS89twkWP9aYN6g0',
		q: searchTerm,
		maxResults: 8,
		pageToken: page
	};
	url = 'https://www.googleapis.com/youtube/v3/search';
	
	$.getJSON(url, params, function(data){
			
		nextPage = data.nextPageToken;
		prevPage = data.prevPageToken;
		console.log(nextPage);
		console.log(prevPage);
		showResults(data.items);

		$('img')

		.css('cursor', 'pointer')
		.css('margin', '1em 0em')
		.click(function(){
		
			watch(this.id);
		});

		$('#next').click(function() {
		
			page = nextPage;
			getRequest();
		});

		$('#prev').click(function() {
		
			page = prevPage;
			getRequest();
		});

		$('#toggle').show();
	});
}

function showResults(results) {

	var html = "";
	
	$.each(results, function(index, value){
		
		html += '<img src="' + value.snippet.thumbnails.medium.url + '" id="' + value.id.videoId + '"><br>'
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