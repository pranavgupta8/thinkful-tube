$(function(){
	
	$('#toggle').hide();

	$('#search-box').submit(function(){

		event.preventDefault();
		searchTerm = $('#query').val();
	
		getRequest();//asynchronous

	});

	$('button').click(function(){
		
		if ($('#next').click()) {
			page = nextPage;
			getRequest();
		}

		else if ($('#prev').click()){
			page = prevPage;
			getRequest();
		}
	});
});

var searchTerm = "";
var page = "";
var nextPage = "";
var prevPage = "";

function getRequest() {

	params = {
		part: 'snippet',
		key: 'AIzaSyCG21WU-MRCDS_GG6QzS89twkWP9aYN6g0',
		q: searchTerm,
		maxResults: 8,
		pagetoken: page
	};
	url = 'https://www.googleapis.com/youtube/v3/search';
	
	$.getJSON(url, params, function(data){
			
		nextPage = data.items.nextPageToken;
		prevPage = data.items.prevPageToken;

		showResults(data.items);

		$('img')

		.css('cursor', 'pointer')
		.css('margin', '1em 0em')
		.click(function(){
		
			watch(this.id);
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