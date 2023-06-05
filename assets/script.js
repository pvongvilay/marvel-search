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


var getCharacterResults = function (language) {
  var apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${x}'
	console.log(apiUrl);

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayResults(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayWikiData = function (data, searchTerm) {
  console.log(data)
}
// what data do you want to grab out
// loop and display some HTML elements to display on page
// 

var displayResults = function (data, searchTerm) {
    console.log(data)
  if (data.length === 0) {
    resultContainerEl.textContent = 'No entries found.';
    return;
  }

  marvelSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    resultContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);

