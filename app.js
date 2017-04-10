var RecipeRequest_URL = 'http://food2fork.com/api/get';
var SearchRequest_URL = 'http://food2fork.com/api/search';
var selected = []; 

//show nav after leaving homescreen and remove homepage buttons
$('body').on('click', 'button#recipe-search, button#ingredient-search', function(event) {
  $('nav').removeClass('hidden');
  $('div.home-container').addClass('hidden');
});

//show recipe search page
$('body').on('click', 'button#recipe-search', function(event) {
  $('#title-searchbar').removeClass('hidden');
  $('div.js-seach-results').removeClass('hidden');
});

//show ingredient search page
$('body').on('click', 'button#ingredient-search', function(event) {
  $('.ingredient-list').removeClass('hidden');
});

//change button color and add item to array selected on click, remove and change color back if clicked again
$('div.ingredient-list').on('click', 'button', function(event) { 
  var ingredientVal = $(this).val();
  if (!$(this).hasClass('selected-button')) {
    $(this).addClass('selected-button');
    console.log(ingredientVal);
    if (ingredientVal=="NaN") {
      return selected;
    } else {
      selected.push(ingredientVal); 
    }
  } else {
    $(this).removeClass('selected-button');
    console.log(ingredientVal);
    var removeItemIndex = selected.indexOf(ingredientVal);
    console.log(removeItemIndex);
    selected.splice(removeItemIndex, 1); 
  }
  return selected;
});



  

//food2fork api
function getSearchFromApi(searchTerm, callback) {
  var query = {
    key: '67da4d03f58c56d22ee2072df42106f9',
    q: searchTerm,
  }
  $.getJSON(SearchRequest_URL, query, callback);
}

function displaySearchData(data) {
  var displayElem = $('.js-search-results');
  data.items.forEach(function(item) {
    var elem = $('.js-result-template').children().clone();
    var imageUrl = item.snippet.thumbnails.default.url;
    elem.find('img').attr('src', imageUrl);
    displayElem.append(elem);
  });
}

function clearResults() {
    $('.js-search-results').empty();
 }

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    clearResults();
    var query = $(this).find('.js-query').val();
    getSearchFromApi(query, displaySearchData);
  });
}

$(function() {
    watchSubmit();
});
