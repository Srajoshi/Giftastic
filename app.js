// Initial array of drinks
var drinks = ["Beer", "Bloody Mary", "Red Wine", "Champagne", "Pina Colada", "whiskey", "Vodka", "Gin", "coffee", "Martini", "Margaritas", "Cosmopolitan", "Mojitos", "Rum"];

// Function for displaying movie data
function renderButtons() {

  // Delete the content inside thedrinks-buttons div prior to adding new buttons
 $("#drinks-buttons").empty();
  // (this is necessary otherwise you will have repeat buttons)

  // Loop through the array of drinks, then generate buttons for each drink in the array
  for (i = 0; i< drinks.length; i++) {

    var button = $("<button>");
    button.addClass("drinks btn-outline-info");
    button.attr("data-drink", drinks[i]);
    button.text(drinks[i]);
    $("#drinks-buttons").append(button);

  }

}
// This function handles events where one button is clicked
// $("#add-drink").on("click", function() {

$("#submit-btn").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var newDrink = $("#drink-input").val().trim();
        // The movie from the textbox is then added to our array
        drinks.push(newDrink);

        // calling renderButtons which handles the processing of our movie array("#drink-input").empty();
        renderButtons();
        $("#search-bar").val("")
        // $('.form-control').attr('value',"");
      });
 

// });

// Calling the renderButtons function to display the initial list of drinks
renderButtons();

$(document).on("click", ".drinks", function() {
  // event.preventDefault();

  // $("#buttons").empty();
  var drinksgif = $(this).attr("data-drink");
  console.log(drinksgif);

  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
drinksgif + "&api_key=hF64yzKjFXR0DDr4fC6MIy1wDljBqXsM&limit=10";
  // dc6zaTOxFJmzC
$.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data
    // clear the display div
    // $("#gifs-display").empty();

    for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        // if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div for the gif
          
          // console.log(results);
          var gifDiv = $("<div>");

          // Storing the result item's rating
          var rating = results[i].rating;
          console.log(rating);
          var title = results[i].title;
          // Creating a paragraph tag with the result item's rating
          var p1 = $("<h6>").text("Title: " + title);
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var drinkImage = $("<img>");
          drinkImage.attr({
                    "data-state": "still",
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
          })

          drinkImage.addClass("gifs")

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          drinkImage.attr("src", results[i].images.fixed_height_still.url);
          console.log(drinkImage)

          // Appending the paragraph and drinkImage we created to the "gifDiv" div we created
          gifDiv.append(p1);
          gifDiv.append(p);
          gifDiv.append(drinkImage);

          // Appending the gifDiv to the "#gifs-display" div in the HTML
          $("#gifs-display").prepend(gifDiv);
        }

        $(".gifs").on("click", function() {

          // Use the .attr() method for this.
      var state = $(this).attr("data-state");
    

      // STEP THREE: Check if the variable state is equal to 'still',
      if(state === "still") {
        // then update the src attribute of this image to it's data-animate value,
        $(this).attr("src", $(this).attr("data-animate"));
  
      // and update the data-state attribute to 'animate'.
      $(this).attr("data-state", "animate");

      } else {

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

      }

    })
      

  });
})
