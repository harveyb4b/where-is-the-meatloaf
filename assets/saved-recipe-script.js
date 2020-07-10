$(document).ready(function(){


    var recipeCardDiv = $("<div>").attr("class", "col s12 m7").attr("id", "recipeCardDiv" + i);
    recipeCardDiv.appendTo(".savedRecipes");

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

    var recipeLink = $("<a>").attr("href", recipeURL).attr("target", "_blank").text("Ma! Where's the " + recipeName + "?");
    recipeLink.appendTo("#cardActionDiv" + i);

    var saveRecipe = $("<a>").attr("href", "#").text("Save this recipe");
    saveRecipe.appendTo("#cardActionDiv" + i);



});