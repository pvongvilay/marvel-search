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

  var characterName = nameInputEl.value.trim();

  if  (characterName) {
<<<<<<< Updated upstream
    getSearchResults(characterName);
=======
    getSearchResults(charactername);
>>>>>>> Stashed changes

    resultContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a Marvel character');
  }
};

var buttonClickHandler = function (event) {
  var language = event.target.getAttribute('data-category');

  if (language) {
<<<<<<< Updated upstream
    getSearchResults(language);
=======
    resultContainerEl(language);
>>>>>>> Stashed changes

    resultContainerEl.textContent = '';
  }
};

var getSearchResults = function (data) {
  var apiUrl = 'developer.marvel.com/3b41988d37a01d92d13f568a454743cb' + data + '';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displaySearchResults(data);
          console.log(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Please search another character.');
    });
};



var getFeaturedRepos = function (language) {
  var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No repositories found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;

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

    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);
