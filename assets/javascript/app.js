// Author: Nigel Finley. August 2016. UT Bootcamp GIPHY API Assisgnment

// Instructions

// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.

// We chose animals for our theme, but you can make a list to your own liking.
// Your app should take the topics in this array and create buttons in your HTML.

// Try using a loop that appends a button for each string in the array.
// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).

// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.
// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// Rejoice! You just made something really cool.


// Variables
giphyObj = {
    topics: [
    	"Coldplay", 
    	"The Beatles", 
    	"Beyonce", 
    	"Miley Cyrus", 
    	"Drake",
    	"Taylor Swift", 
    	"Justin Bieber",
    	"Jennifer Lopez",
    	"Mariah Carey",
    	"Power Rangers", 
    	"Rolling Stones",
    	"Selena Gomez"
    	],


	 
    // Functions
    buildButtons: function() {

        // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
        
        // Figure out what id I need to target
        $('#buttonsview').empty();
        // Loops through the array of movies
        for (var i = 0; i < this.topics.length; i++) {
        	console.log("This is the topics object: " + this.topics);
            // Then dynamicaly generates buttons for each movie in the array

            var buildButton = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
            buildButton.attr('class', 'col s2 waves-effect waves-light btn orange darken-1 z-depth-3 celeb'); // Added a class 
            buildButton.attr('data-name', this.topics[i]); // Added a data-attribute
            buildButton.text(this.topics[i]); // Provided the initial button text
            console.log("the button element: " + JSON.stringify(buildButton));

            // append the div to buttonsview
            $('#buttonsView').append(buildButton);
        }
    },

    displayCelebInfo: function() {

    	var celeb = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celeb + "&api_key=dc6zaTOxFJmzC&limit=12";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                // step 1: Run this file, click a button, and see what the data looks like in the browser's console. Open up the Object, then open up the data key, then open up 0. Study the keys and how the JSON is structured.

                console.log(response)

                // step 2: since the image information is inside of the data key then make a variable named results and set it equal to response.data
                
                //------------put step 2 in between these dashes--------------------
            var results = response.data; 
                //--------------------------------
            // var rating = results[i].rating;
            // var ratingUpper = rating.Uppercase();

                for (var i = 0; i < results.length; i++) {

                	// creates the materialize 'card'
                    var celebDiv = $('<div class="col s2 m3 l3"><div class="card"><div class="card-image"><img src="'+ results[i].images.fixed_height_small_still.url + '" data-still="'+ results[i].images.fixed_height_small_still.url+ '" data-animate="'+ results[i].images.fixed_height_small.url +'" data-state="still"></div><div class="card-content"><p class="rate"> Rating: '  + results[i].rating + '</p></div></div></div>');

                    // var p = $('<p>').text("Rating: " + results[i].rating);
                    // // p = results[i].rating;
                    // var celebImage = $('<img src=" ' + results[i].images.fixed_height.url + '">');
                    // celebDiv.append(p);
                    // celebDiv.append(celebImage);

                    // p.html("Rating: " + results[i].rating);

                    // This grabs the id and the puts our new div on the page
                    $('#gifsAppearHere').prepend(celebDiv);

			    }
			});
		}	


}

// PAGE LOAD AND RUN FUNCTIONS
// ========================================================
$(document).ready(function() {
	// The buttons are not emptying
	$('#buttonsview').empty();
	giphyObj.buildButtons();

// This function handles events where one button is clicked
	$('#addCeleb').on('click', function() {

	    // This line of code will grab the input from the textbox
	    var celeb = $('#celeb-input').val().trim();
	    console.log("The input typed: " + celeb);
	    // The movie from the textbox is then added to our array
	    giphyObj.topics.push(celeb);

	    // Our array then runs which handles the processing of our movie array
	    giphyObj.buildButtons();

	    // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
	    return false;
	});
	// // ========================================================

// // Generic function for displaying the movieInfo
	$(document).on('click', '.celeb', giphyObj.displayCelebInfo);
		console.log(this);
	
	$(document.body).on('click', '.card-image img', function() {
		console.log("Picture Click: " + this);
		
		
		var state = $(this).attr('data-state');
		if (state === 'still'){
			var animateUrl = $(this).attr('data-animate');
			$(this).attr('src', animateUrl);
			$(this).attr('data-state', 'animate');
			console.log(state);


		}
		else {
			var animateUrl = $(this).attr('data-still');
			$(this).attr('src', animateUrl);
			$(this).attr('data-state', 'still');
		}


	});





// // ========================================================

// // This calls the renderButtons() function
	// giphyObj.buildButtons();


});




