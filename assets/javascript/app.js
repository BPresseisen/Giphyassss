//  Initial array of topics
var giphs  = ["purim", "tennis", "sandwiches", "beer", "air jordans"];

window.onload = function() {

        // Deleting the giphs prior to adding new giphs
        // (this is necessary otherwise you will have repeat buttons)
        // $(".btnCol").empty();

        // // Looping through the array of giphs
        // console.log("the giphs length is: " + giphs.length);

        // for (var i = 0; i < giphs.length; i++) {

        //         // Then dynamicaly generating buttons for each giph in the array
        //         // This code $("<button>") is all jQuery needs to create the beginning and end tag. 
        //         // (<button></button>)
        //         var a = $("<button>");
        //         // Adding a class of giph-btn to our button
        //         a.addClass("giph-btn");
        //         // Adding a data-attribute
        //         console.log("the giph to add is: " + giphs[i]);
        //         a.attr("data-name", giphs[i]);
        //         // Providing the initial button text
        //         a.text(giphs[i]);
        //         // Adding the button to the btnCol div
        //         $(".btnCol").append(a);
        // };

        renderButtons();

};

//  displayGiphs function re-renders the HTML to display the appropriate content
function displayGiphs(){
//  CLEAR OUT THE GIPH IMAGES AREA FOR ANY PRE-EXISTING IMAGES

//  Creating a variable for the search and then an AJAX call for the topic

//  Have to add the 10 giphs for a topic-button when clicked for(i=0; i<10;i++){}

//  For each giph that is added, have to assign a value that corresponds to its position in the original AJAX object

//  The value will be referenced each time that the particular giph, itself, is clicked so that the alternating
//  between still and animated versions occurs programatically

//  Have to add rating above each giph

        event.preventDefault();

        $(".giphCol").empty();

        var giph = $(this).attr("data-name");

        // var giph = $.get("http://api.giphy.com/v1/gifs/search?q=" + giph + "&api_key=sjbQh01WgqfLEnTUlhfHiF1n1Ul4TyIQ&limit=10");
        // giph.done(function(giphReturn) { console.log("giphReturn", giphReturn); });

        console.log(giph);

        var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + giph + 
        "&api_key=sjbQh01WgqfLEnTUlhfHiF1n1Ul4TyIQ&limit=10";

        console.log(queryURL);

        $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(response) {
                console.log(response);     

        //  Giphyassss API key: sjbQh01WgqfLEnTUlhfHiF1n1Ul4TyIQ -->
        
        console.log("response length is: " + response.data.length);

        for(i=0;i<response.data.length;i++){
                
                //  Creating a div to hold the giph
                var giphDiv = $("<div class='giph'>");

                //  Storing the title data
                var title = response.data[i].title;
                console.log(title);     
        
                //  Creating an element to have the title displayed
                var pOne = $("<p>").text("Title: " + title);

                //  Displaying the title
                giphDiv.append(pOne);

                //  Storing the rating data
                var rating = response.data[i].rating;

                //  Creating an element to have the rating displayed
                var pTwo = $("<p>").text("Rating: " + rating);

                //  Displaying the rating
                giphDiv.append(pTwo);

                //  Displaying the giph as STILL
                var imgGiph =  response.data[i].images.original_still.url;
                
                // imgGiph for ANIMATED VERSION
                // var imgGiph = response.data[i].images.original.url;
                
                //  Creating an element to hold the image
                //  Creating a data-name for the giph--CAPTURE IT'S INDEXED POSITION IN THE AJAX OBJECT--TO BE USED
                //  IN THE .on("click") method when going back to the AJAX OBJECT FOR THE NEEDED PROPERTIES (STILL
                //  ANIMATE,//  STATE)

                // var img = $("<img>").attr("src", imgGiph "data-name", response.data[i] "state", "still"));

                var img = $("<img>")
                        .attr("src", imgGiph)
                        .attr("data-still", response.data[i].images.original_still.url)
                        .attr("data-animate", response.data[i].images.original.url)
                        .attr("data-state", "still");

                //  Appending the image
                giphDiv.append(img);

                var pDash = $("<p>").text("============");

                giphDiv.append(pDash)

                //  Putting the new giphs above the previous giphs
                $(".giphCol").append(giphDiv);
                };

        });  
};

//Function for displaying giph data
function renderButtons() {

        // Deleting the giphs prior to adding new giphs
        // (this is necessary otherwise you will have repeat buttons)
        $(".btnCol").empty();

        // Looping through the array of giphs
        console.log("the giphs length is: " + giphs.length);

        for (var i = 0; i < giphs.length; i++) {

                // Then dynamicaly generating buttons for each giph in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. 
                // (<button></button>)
                var a = $("<button>");
                // Adding a class of giph-btn to our button
                a.addClass("giph-btn");
                // Adding a data-attribute
                console.log("the giph to add is: " + giphs[i]);
                a.attr("data-name", giphs[i]);
                // Providing the initial button text
                a.text(giphs[i]);
                // Adding the button to the btnCol div
                $(".btnCol").append(a);
                };
                
        $("#topic-input").val("");
};

$(".add-topic").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var giph = $("#topic-input").val().trim();
        // Adding giph from the textbox to our array
        if(giph.length){
                $('#blankSearch').addClass("invisible");
                giphs.push(giph);
                renderButtons();
        }else{
                $('#blankSearch').removeClass("invisible");

        };
renderButtons();
});

// to be used when a giph is clicked

$(document).on("click", "img", function(event) {
        event.preventDefault();

        var state = $(this).attr("data-state");
        console.log("the state is: " + state);
        // if(state==="still"){
        //         $(this)
        //         .attr("data-state", "animate")
        //         .attr("src", response.data[i].images.original.url)
        // }else if(state==="animate"){
        //         $(this)
        //         .attr("data-state", "still")
        //         .attr("src", response.data[i].images.original_still.url)
        // };
        if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
});

// to be used when a topic-button atop the page is clicked to call the displayGiphs function and render 10 giphs
// from the response object

$(document).on("click", ".giph-btn", displayGiphs);


