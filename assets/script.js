$(document).ready(function(){

    $('.modal').modal();
    $('select').formSelect();
    displayData();

    //recipeSearchButtonsClick();

    var keywordSearch;
    var prepTime;
    var calories; 
    var ingredients;
    var dietType;
    

    $("#searchBtn").on("click", function(event){
        event.preventDefault();
        keywordSearch = $("#keyword-search").val().trim();
        console.log(keywordSearch);

        searchFunction(keywordSearch);
        saveSearch(keywordSearch);
    });

    $("#modal-search").on("click", function(event) {
        event.preventDefault();
        keywordSearch = $("#keyword-search").val().trim();
        prepTime = $("#time-search").val().trim();
        calories = $("#calories").val().trim();
        ingredients = $("#num-ingredients").val().trim();
        dietType = $("#diet-type option:selected").text();

        var appendToQueryURL = "";

        if (prepTime) {
            appendToQueryURL = appendToQueryURL + "&time=" + prepTime;
        }
        
        if (calories) {
            calories = calories * 1000;
            appendToQueryURL = appendToQueryURL + "&calories=" + calories;
        }

        if (ingredients) {
            appendToQueryURL = appendToQueryURL + "&ingr=" + ingredients;
        }

        if (dietType != "Choose your option") {
            dietType = dietType.toLowerCase();
            appendToQueryURL = appendToQueryURL + "&diet=" + dietType;
        }

        searchFunction(keywordSearch, appendToQueryURL);
        saveSearch(keywordSearch);

    });

    function saveSearch(keywordSearch) {
        var getSavedKeywords = [];
        getSavedKeywords = JSON.parse(localStorage.getItem("keywordSearches"));

        if (!getSavedKeywords.includes(keywordSearch)) {
            if (getSavedKeywords) {
                getSavedKeywords = keywordSearch + "," + getSavedKeywords;
            } else {
                getSavedKeywords = keywordSearch;
            }
        }

        localStorage.setItem("keywordSearches", JSON.stringify(getSavedKeywords));

        $("#recent-searches").empty();
        displayData();
    }

    function displayData() {
        //get recipes from local storage and add to #recent-searches div
        var searchButtons = JSON.parse(localStorage.getItem("keywordSearches")).split(",");

        $.each(searchButtons, function(j) {
            var newButton = $("<button>").attr("class", "waves-effect waves-light btn search-buttons").attr("id", searchButtons[j]).html(searchButtons[j]);
            newButton.appendTo("#recent-searches");
        });

        $(".search-buttons").on("click", function(event){
            event.preventDefault();
            console.log(this.id);
            
            searchFunction(this.id);
            $("#keyword-search").val(this.id);
        });
    }


    function searchFunction(keyword, additionalCriteria) {
        var appId = "820ec0b8"
        var appKey = "04c431218d56d654849a5ee10439cbba"
        var queryURL = `https://cors-anywhere.herokuapp.com/api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${keyword}${additionalCriteria}`
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET" 
        })
            .then(function (response) {

            $(".recipeResults").empty();

            var recipeResults = response.hits;
            for (var i = 0; i < recipeResults.length; i++) {
                var recipeName = recipeResults[i].recipe.label; 
                var numIngredients = recipeResults[i].recipe.ingredientLines.length;
                var numServings = recipeResults[i].recipe.yield;
                var caloriesPerServing = recipeResults[i].recipe.calories;
                var timeToCook = recipeResults[i].recipe.totalTime; 
                var dietType = recipeResults[i].recipe.dietLabels;    
                var recipeURL = recipeResults[i].recipe.url;
                var recipeImage = recipeResults[i].recipe.image;

                console.log(recipeName)
                console.log(numIngredients)
                console.log(numServings)
                console.log(caloriesPerServing)
                console.log(timeToCook)
                console.log(dietType)
                console.log(recipeURL)
                console.log(recipeImage)
                console.log("......")

                //var recipeImage = $("<img>").attr("src", recipeImage).attr("id", recipeName + i).attr("class", "col s4 recipeImage");
                //recipeImage.appendTo(".recipeResults");

                var recipeResult = $("<p>").html(recipeName);
                recipeResult.appendTo(".recipeResults");

                //We can build the code below using recipe info to appear in a "card" format 

                // <div class="col s12 m7">
                //     <h2 class="header">Horizontal Card</h2>
                //     <div class="card horizontal">
                //     <div class="card-image">
                //         <img src="https://lorempixel.com/100/190/nature/6">
                //     </div>
                //     <div class="card-stacked">
                //         <div class="card-content">
                //         <p>I am a very simple card. I am good at containing small bits of information.</p>
                //         </div>
                //         <div class="card-action">
                //         <a href="#">This is a link</a>
                //         </div>
                //     </div>
                //     </div>
                // </div>

            } 
            
            console.log(response)
            
        });
    }
})