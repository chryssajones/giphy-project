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
	$("#formInput").val("");
	});


function getGiphy(i, title) {
	// var title = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=w6skDb3bVpSH3akfsKjgt2h2jfKq4Iou&q=" + title + "&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    	}).done(function(response) {
    		var still = response.data[i].images.fixed_width_still.url
    		console.log(still);
    		var gifDiv = $("<div class='gifs panel panel-info'>");
    		var rating = response.data[i].rating;
    		var display = $("<p>").text("Rating: " + rating);
    		var labelNum = i + 1;
    		var label = $("<h4>").text(title + " Gif #" + labelNum);
    		label.addClass("panel panel-title panel-heading")
 	    	var stillImage = $("<img>").attr("src", still);
    		gifDiv.append(label); 	    	   		
    		gifDiv.append(display);
    		gifDiv.append(stillImage);
    		gifDiv.attr("id", "gif" + i);
    		gifDiv.css({"width":"220px", "display":"inline-grid", "margin":"10px", "padding":"10px", "text-align":"center"})
    		$("#giphyDiv").append(gifDiv);
	});
};

for (i=0; i<10; i++) {
	console.log(i);
	getGiphy(i, "Moana");
};

//this closes the (document).ready function.  Do not delete!
});