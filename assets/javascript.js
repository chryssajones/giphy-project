console.log("JavaScript is loaded")
$(document).ready(function(){

var movies = ["Toy Story", "The Lion King", "The Incredibles", "Moana", "Inside Out"];

function renderButtons() {
	$("#buttonDiv").empty();
	for (var i = 0; i < movies.length; i++) {
		var b = $("<button>");
			b.addClass("movieButton btn btn-primary");
			b.css("margin", "10px");
			b.attr("data-name", movies[i]);
			b.text(movies[i]);
			$("#buttonDiv").append(b);
		};
	};

renderButtons();

$("#submitBtn").on("click", function(addMovie) {
	event.preventDefault();
	var newMovie = $("#formInput").val().trim();
	movies.push(newMovie);
	renderButtons();
	});


function getGiphy() {
	// var title = $(this).attr("data-name");
	var title = "cinderella";
	var i=0;
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=w6skDb3bVpSH3akfsKjgt2h2jfKq4Iou&q=" + title + "&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    	}).done(function(response) {
    		var still = response.data[i].images.fixed_height_still.url
    		console.log(still);
    		var gifDiv = $("<div class='gifs'>");
    		var rating = response.data[i].rating;
    		console.log(rating);
    		var display = $("<p>").text("Rating: " + rating);
    		var labelNum = i + 1;
    		var label = $("<p>").text(title + " #" + labelNum);
 	    	var stillImage = $("<img>").attr("src", still);
    		gifDiv.append(label); 	    	   		
    		gifDiv.append(display);
    		gifDiv.append(stillImage);
    		gifDiv.attr("id", "gif" + i);
    		$("#giphyDiv").append(gifDiv);
	});
};

getGiphy();

//this closes the (document).ready function.  Do not delete!
});