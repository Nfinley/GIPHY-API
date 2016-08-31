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
    	"Kim Kardashian", 
    	"Angelina Jolie", 
    	"Justin Bieber", 
    	"Taylor Swift", 
    	"Drake", 
    	"Brad Pitt", 
    	"George Clooney", 
    	"Mariah Carey", 
    	"Jennifer Aniston", 
    	"Power Rangers"],


    // Functions
    buildButtons: function() {

        // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
        
        // Figure out what id I need to target
        $('#buttonsview').empty();

        // Loops through the array of movies
        for (var i = 0; i < this.topics.length; i++) {

            // Then dynamicaly generates buttons for each movie in the array

            // Note the jQUery syntax here... 
            var li = $('<li>');
            li.addClass('padding-bold').addId('buttonsview');

            var buildButton = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
            buildButton.addClass('waves-effect waves-light btn orange darken-1 z-depth-3'); // Added a class 
            buildButton.attr('data-name', this.topics[i]); // Added a data-attribute
            buildButton.text(this.movies[i]); // Provided the initial button text

            $('#nav-mobile').append(li); // Added the li to the ul element
        }
    }


}


// ========================================================

// This function handles events where one button is clicked
$('#addCeleb').on('click', function() {

    // This line of code will grab the input from the textbox
    var celeb = $('#celeb-input').val().trim();
    console.log(celeb);
    // The movie from the textbox is then added to our array
    giphyObj.topics.push(celeb);

    // Our array then runs which handles the processing of our movie array
    renderButtons();

    // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
    return false;
})

// ========================================================

// Generic function for displaying the movieInfo
$(document).on('click', '.movie', displayMovieInfo);


// ========================================================

// This calls the renderButtons() function
renderButtons();
