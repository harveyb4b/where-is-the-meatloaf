

var appId = "820ec0b8"
var appKey = "04c431218d56d654849a5ee10439cbba"
var queryURL = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=chicken`
console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET" 
})
    .then(function (response) {

        console.log(response);
        
});

