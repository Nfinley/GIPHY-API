// Author: Nigel Finley. August 2016. UT Bootcamp GIPHY API Assisgnment

/*This app  uses GIPHY's API to take seach strings and pull gifs from their database and then it is displayed on the page. 
 Additionally when you click on an image it annimates and when you click it again it will stop. Users can add their own buttons 
 by entering a name in the 'choose your star' field and then selecting 'Add your star'.

*/


// TO DO: 
// 1. Animate the Gipy header image to come in on load
// 2. put the card divs into templating


// Variables
giphyObj = {
    topics: [
    	"Michael Jackson", 
    	"Rolling Stones",
    	"Prince",
    	"Coldplay", 
    	"The Beatles", 
    	"Beyonce", 
    	"Miley Cyrus", 
    	"Drake",
    	"Taylor Swift", 
    	"Justin Bieber",
    	"Jennifer Lopez",
    	"Mariah Carey"
    	],


	 
    // Functions
    buildButtons: function() {

        // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
        
        // Figure out what id I need to target
        $('#buttonsView').empty();
        // Loops through the array of movies
        for (var i = 0; i < this.topics.length; i++) {
        	console.log("This is the topics object: " + this.topics);
            // Then dynamicaly generates buttons for each movie in the array

            var buildButton = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
            buildButton.attr('class', 'col s6 m3 l2 waves-effect waves-light btn orange darken-1 z-depth-3 star'); // Added a class 
            buildButton.attr('data-name', this.topics[i]); // Added a data-attribute
            buildButton.text(this.topics[i]); // Provided the initial button text
            console.log("the button element: " + JSON.stringify(buildButton));

            // append the div to buttonsview
            $('#buttonsView').append(buildButton);
        }
    },

    displayStarInfo: function() {

    	var star = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + star + "&api_key=dc6zaTOxFJmzC&limit=12";

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
            $('#gifsAppearHere').empty();
                for (var i = 0; i < results.length; i++) {

                	// creates the materialize 'card'
                    var starDiv = $('<div class="col s12 m4 l3"><div class="card"><div class="card-image"><img src="'+ results[i].images.fixed_height_small_still.url + '" data-still="'+ results[i].images.fixed_height_small_still.url+ '" data-animate="'+ results[i].images.fixed_height_small.url +'" data-state="still"></div><div class="card-content"><p class="rate"> Rating: '  + results[i].rating + '</p></div></div></div>');

                    // var p = $('<p>').text("Rating: " + results[i].rating);
                    // // p = results[i].rating;
                    // var starImage = $('<img src=" ' + results[i].images.fixed_height.url + '">');
                    // starDiv.append(p);
                    // starDiv.append(starImage);

                    // p.html("Rating: " + results[i].rating);

                    // This grabs the id and the puts our new div on the page
                    $('#gifsAppearHere').prepend(starDiv);

			    }
			});
		}	


}

// PAGE LOAD AND RUN FUNCTIONS
// ========================================================
$(document).ready(function() {
	

// This function handles events where one button is clicked
	$('#addStar').on('click', function() {

	    // This line of code will grab the input from the textbox
	    var star = $('#star-input').val().trim();
	    console.log("The input typed: " + star);
	    // The movie from the textbox is then added to our array
	    giphyObj.topics.push(star);

	    // This function put the button just created on the page
	    giphyObj.buildButtons();

	    // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
	    return false;
	});
	// // ========================================================

// // Generic function for displaying the movieInfo
	$(document).on('click', '.star', giphyObj.displayStarInfo);
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

// The buttons are not emptying
	$('#buttonsView').empty();
	giphyObj.buildButtons();


});




