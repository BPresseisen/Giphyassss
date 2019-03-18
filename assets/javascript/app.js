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

        var giph = $(this).attr("data-name").trim();

        // var giph = "beer";

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
        });      

        //  Giphyassss API key: sjbQh01WgqfLEnTUlhfHiF1n1Ul4TyIQ -->

        //  Creating a div to hold the giph
        // var giphDiv = $("<div class='giph'>");

        //  Storing the rating data
        // var rating = response.rating;

        //  Creating an element to have the rating displayed
        // var pOne = $("<p>").text("Rating: " + rating);

        //  Displaying the rating
        // giphDiv.append(pOne);

        // repeat the above for the TITLE which also needs to be returned

        //  Displaying the giph
        var imgGiph_s =  response.data[0].images.original_still.url;
        console.log(imgGiph_s);

        var imgGiph = response.data[0].images.original.url;
        console.log(imgGiph);

        //  Creating an element to hold the image
        // var img = $("<img>").attr("src", imgGiph);

        //  Creating a data-name for the giph--CAPTURE IT'S INDEXED POSITION IN THE AJAX OBJECT--TO BE USED
        //  IN THE .on("click") method when going back to the AJAX OBJECT FOR THE NEEDED PROPERTIES (STILL, ANIMATE,//  STATE)
        // var img = $("<img>"").attr("data-name",response[i]);

        //  Appending the image
        // giphDiv.append(imgGiph);

        //  Putting the new giphs above the previous giphs
        // $("#giph-col").prepend(giphDiv);

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

// $(".giph").on("click", function(event) {
//         event.preventDefault();

//         // capture the giph data-name...response[i]...INDEXED POSITION IN THE AJAX OBJECT
//         // use the data-name to reach the correct indexed-positioned spot in the resoonse object
//         // declare these variables:
//         // var stillGIPH
//         // var animGIPH
//         // var state
//         // take note of the current src and if it is the animated, switch to still and VICE VERSA
// }

// to be used when a topic-button atop the page is clicked to call the displayGiphs function and render 10 giphs
// from the response object

$(".giph-btn").on("click", function(event) {
// $(document).on("click", ".giph-btn" function(event) {
       
        event.preventDefault();

        console.log("string");

        displayGiphs();
});