// Jay's comments:
// changed 'langauge' to 'category'
// changed 'user-name' to 'character-name
// changed repo-container' to 'result-container'
// changed 'repo-search-term' to 'marvel-search-term'

var userFormEl = document.querySelector('#user-form');
var categoryButtonsEl = document.querySelector('#language-buttons');
var characterInputEl = document.querySelector('#character-name');
var resultContainerEl = document.querySelector('#result-container');
var marvelSearchTerm = document.querySelector('#marvel-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var characterName = characterInputEl.value.trim();
  var storedName = localStorage.getItem('characterNames');
  var characterNames = JSON.parse(storedName); // characterNames is an array of names


  if  (characterName) {
    getSearchResults(characterName);

    resultContainerEl.textContent = ''; 
    characterInputEl.value = ''; 
    console.log(characterName);
  if (characterNames)  {
    characterNames.push(characterName)
  }
  else {
    characterNames=[characterName]
  }
    localStorage.setItem('characterNames', JSON.stringify(characterNames))
    document.getElementById('characterNames').innerHTML = characterNames;
  } 
  else {
    alert('Please enter a Marvel character');
  }
};

var buttonClickHandler = function (event) {
  var language = event.target.getAttribute('data-language');

  if (language) {
    getCharacterResults(language);

    resultContainerEl.textContent = '';
  }
};


var getSearchResults = function (user) {
  
  var apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=marvel%20${user}`;
	console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWikiData(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
     .catch(function (error) {
      alert('Please search another character.');
    });
};

// 'https://en.wikipedia.org/w/api.php?action=query&format=json&limit=15&callback=?&titles=' + searchCriteria, processResult);


// var getCharacterResults = function (language) {
  // var apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${x}'
	// console.log(apiUrl);

  // fetch(apiUrl).then(function (response) {
    // if (response.ok) {
      // response.json().then(function (data) {
        // displayResults(data.items, language);
      // });
    // } else {
      // alert('Error: ' + response.statusText);
    // }
  // });
// };

var displayWikiData = function (data, searchTerm) {
  console.log(data.query.search, searchTerm)
  var results = data.query.search;
  for (var i=0 ; i < results.length; i++ ){ 
    var listItem = `<li>${results[i].title}</li>`
    resultContainerEl.innerHTML = resultContainerEl.innerHTML + listItem
  }
  
}


// what data do you want to grab out
// loop and display some HTML elements to display on page
// 

var displayResults = function (data) {
  if (data.length === 0) {
    resultContainerEl.textContent = 'No entries found.';
    return;
  }}
 function ClickHandler(event) {
    console.log(data)
    resultContainerEl.textContent=data

  }

var baseUrl = "http://gateway.marvel.com";
var apiKey = "6229f92d803a98103b1a75e888b250e9"; // get and insert api key from marvel here
var mySearchName = "thor"; // change to the search input value

fetch(baseUrl + "/v1/public/characters?name=" + mySearchName + "&apikey=" + apiKey)
  .then(function (res) {
    console.log(res);
    return res.json();
  })
  .then(function (data) {
    console.log(data);
  });
  
// add new referrer to marvel.com when deployed
 userFormEl.addEventListener('submit', formSubmitHandler);