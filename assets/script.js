
var appId = "820ec0b8"
var appKey = "04c431218d56d654849a5ee10439cbba"
var queryURL = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=chicken`
console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET" 
})
    .then(function (response) {

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



    } 
    
    console.log(response)
    
        


        
});

