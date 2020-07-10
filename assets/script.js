$(document).ready(function(){

    $('.modal').modal();
    $('select').formSelect();
    displayData();

    //recipeSearchButtonsClick();

    var keywordSearch;

    $("#searchBtn").on("click", function(event){
        event.preventDefault();
        keywordSearch = $("#keyword-search").val().trim();
        console.log(keywordSearch);

        searchFunction(keywordSearch, "");
        saveSearch(keywordSearch);
    });

    $("#modal-search").on("click", function(event) {
        event.preventDefault();

        var prepTime;
        var calories; 
        var ingredients;
        var dietType;

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
        var searchButtons = JSON.parse(localStorage.getItem("keywordSearches"));

        if (searchButtons) {
            searchButtons = searchButtons.split(",");
        }
        
        $.each(searchButtons, function(j) {
            var newButton = $("<button>").attr("class", "waves-effect waves-light btn search-buttons").attr("id", searchButtons[j]).html(searchButtons[j]);
            newButton.appendTo("#recent-searches");
        });

        $(".search-buttons").on("click", function(event){
            event.preventDefault();
            console.log(this.id);
            
            searchFunction(this.id, "");
            $("#keyword-search").val(this.id);
        });
    }


    function searchFunction(keyword, additionalCriteria) {
        var appId = "820ec0b8";
        var appKey = "04c431218d56d654849a5ee10439cbba";
        //var queryURL = `https://cors-anywhere.herokuapp.com/api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${keyword}${additionalCriteria}`;
        var queryURL = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=${keyword}${additionalCriteria}`;
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
                var caloriesPerServing = Math.round(recipeResults[i].recipe.calories * .001);
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

                // var recipeResult = $("<p>").html(recipeName);
                // recipeResult.appendTo(".recipeResults");

                //We can build the code below using recipe info to appear in a "card" format 

                var recipeCardDiv = $("<div>").attr("class", "col s12 m7").attr("id", "recipeCardDiv" + i);
                recipeCardDiv.appendTo(".recipeResults");

                var nameDiv = $("<h5>").attr("class", "header").attr("id", "nameDiv" + i).text(recipeName);
                nameDiv.appendTo("#recipeCardDiv" + i);

                var cardDiv = $("<div>").attr("class", "card horizontal").attr("id", "cardDiv" + i);
                cardDiv.appendTo("#recipeCardDiv" + i);

                var imgDiv = $("<div>").attr("class", "card-image").attr("id", "imgDiv" + i);
                imgDiv.appendTo("#cardDiv" + i);

                var imgTag = $("<img>").attr("src", recipeImage);
                imgTag.appendTo("#imgDiv" + i);

                var cardStartDiv = $("<div>").attr("class", "card-stacked").attr("id", "cardStartDiv" + i);
                cardStartDiv.appendTo("#cardDiv" + i);

                var cardContentDiv = $("<div>").attr("class", "card-content").attr("id", "cardContentDiv" + i);
                cardContentDiv.appendTo("#cardStartDiv" + i);

                var recipeContentLine1 = $("<h5>").attr("id", "recipeContentLine1" + i).text("Number of Servings: " + numServings);
                recipeContentLine1.appendTo("#cardContentDiv" + i);

                var recipeContentLine2 = $("<h5>").attr("id", "recipeContentLine2" + i).text("Calories per Serving: " + caloriesPerServing );
                recipeContentLine2.appendTo("#cardContentDiv" + i);

                var recipeContentLine3 = $("<h5>").attr("id", "recipeContentLine3" + i).text("Number of Ingredients: " + numIngredients);
                recipeContentLine3.appendTo("#cardContentDiv" + i);

                var recipeContentLine4 = $("<h5>").attr("id", "recipeContentLine4" + i).text("Time to Cook: " + timeToCook);
                recipeContentLine4.appendTo("#cardContentDiv" + i);

                var cardActionDiv = $("<div>").attr("class", "card-action").attr("id", "cardActionDiv" + i);
                cardActionDiv.appendTo("#cardStartDiv" + i);

                var recipeLink = $("<a>").attr("href", recipeURL).attr("target", "_blank").attr("id", "recipeLink" + i).attr("title", recipeURL).text("Ma! Where's the " + recipeName + "?");
                recipeLink.appendTo("#cardActionDiv" + i);

                var saveRecipe = $("<a>").attr("href", "#").attr("id", "saveRecipe" + i).attr("class", "saveRecipe").text("Save this recipe");
                saveRecipe.appendTo("#cardActionDiv" + i);

            } 

            $(".saveRecipe").on("click", function(event){
                event.preventDefault();

                console.log(this.id);
                var index = this.id[this.id.length-1];
                console.log(index);
                console.log(this);
                console.log($("#recipeLink" + index)[0].title);
                console.log($("#recipeLink" + index));
                var myObject = JSON.parse(localStorage.getItem("mySavedRecipes") || "[]");
                var dateSaved = dateFns.format(new Date(), "MM/DD/YYYY");

                var myNewObject = {
                    // "RecipeName": recipeName,
                    // "NumOfIngredients": numIngredients,
                    // "NumOfServings": numServings,
                    // "CaloriesPerServing": caloriesPerServing,
                    // "TimeToCook": timeToCook,
                    // "DietType": dietType,
                    "RecipeURL": $("#recipeLink" + index)[0].title,
                    // "RecipeImageLink": recipeImage,
                    "DateSaved": dateSaved
                }
                
                myObject.push(myNewObject);
            
                localStorage.setItem("mySavedRecipes", JSON.stringify(myObject));
                
            });
            
            console.log(response)
            
        });
    }
})