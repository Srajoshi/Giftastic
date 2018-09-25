// Initial array of drinks
var drinks = ["Beer", "Bloody Mary", "Red Wine", "Champagne", "Pina Colada", "whiskey", "Vodka", "Gin"];

// Function for displaying movie data
function renderButtons() {

  // Delete the content inside thedrinks-buttons div prior to adding new buttons
  $("#drinks-buttons").empty();
  // (this is necessary otherwise you will have repeat buttons)

  // Loop through the array of drinks, then generate buttons for each drink in the array
  for (i = 0; i< drinks.length; i++) {

    var button = $("<button>");
    button.addClass("drinks");
    button.attr("data-drink", drinks[i]);
    button.text(drinks[i]);
    $("#drinks-buttons").append(button);

  }

}

// This function handles events where one button is clicked
// $("#add-drink").on("click", function() {

//   // CODE 

// });

// Calling the renderButtons function to display the initial list of drinks
renderButtons();

$("button").on("click", function() {
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
    $("#gifs-display").empty();

    for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        // if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div for the gif
          
          // console.log(results);
          var gifDiv = $("<div>");

          // Storing the result item's rating
          var rating = results[i].rating;
          console.log(rating);
          // Creating a paragraph tag with the result item's rating
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
          gifDiv.append(p);
          gifDiv.append(drinkImage);

          // Appending the gifDiv to the "#gifs-display" div in the HTML
          $("#gifs-display").append(gifDiv);
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
