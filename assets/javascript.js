console.log("JavaScript is loaded")
$(document).ready(function(){

var movies = ["Toy Story", "Zootopia", "The Incredibles", "The Lion King", "Aladdin", "Moana", "Inside Out"];
var movieTitle = "";
renderButtons();

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

// this generates a new button from form entry and then clears the form
$("#submitBtn").on("click", function(addMovie) {
	event.preventDefault();
	var newMovie = $("#formInput").val().trim();
	movies.push(newMovie);
	renderButtons();
	$("#formInput").val("");
	});

// this displays the gifs when you click on a movie title
	movieTitle = $(this).attr("data-name");
	// console.log(movieTitle);
	$("#giphyDiv").empty();
	for (i=0; i<10; i++) {
		// console.log(i);
		getGiphy(i, movieTitle);
	};
});


// var still = "";
// var animate = "";

function getGiphy(i, title) {
	// var title = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=w6skDb3bVpSH3akfsKjgt2h2jfKq4Iou&q=" + title + "&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    	}).done(function(response) {
    		var still = response.data[i].images.fixed_width_still.url;
    		var animate = response.data[i].images.looping.mp4;
    		// console.log(still);
    		// console.log(animate);
    		var gifDiv = $("<div class='gifs panel panel-info'>");
    		var rating = response.data[i].rating;
    		var display = $("<p>").text("Rating: " + rating);
    		var labelNum = i + 1;
    		var label = $("<h4>").text(title + " Gif #" + labelNum);
 	    	var stillImage = $("<img>");
 	    	stillImage.attr({"data-still":still, "data-animate":animate, "data-state":"still", "src":still, "id":title+"label"+i});
 	    	stillImage.addClass("btn btn-default gifImage");
    		gifDiv.append(label); 	    	   		
    		gifDiv.append(display);
    		gifDiv.append(stillImage);
    		gifDiv.attr("id", "gif" + i);
    		gifDiv.css({"width":"250px", "display":"inline-grid", "margin":"15px", "padding":"10px", "text-align":"center"})
    		$("#giphyDiv").append(gifDiv);
	});
};

// This enables animation when the user clicks on the gif image, but there's a bug in the event listener.
$(document.body).on('click', '.gifImage', function() {
	console.log("something was clicked");
	var state = $(this).attr("data-state");
	if (state === "still") {
	  $(this).attr("src", $(this).attr("data-animate"));
	  $(this).attr("data-state", "animate");
	} else {
	  $(this).attr("src", $(this).attr("data-still"));
	  $(this).attr("data-state", "still");
	}
});




//this closes the (document).ready function.  Do not delete!
});