"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

//TODO submit in navbar button on click
// Display html for form
//add onclick that calls getStoryDataAndAddToPage to the submit button



function navSubmitClick(evt) { // navSubmitClick
  evt.preventDefault();
  $('.add-a-book').show();
}

// remmember to hide all other elemnts and just showt this one
$(".submit-link").on('click', navSubmitClick);

function navFavoritesClick(evt) {
  evt.preventDefault();
  hidePageComponents();
  putFavoritesOnPage();

  $favoritesContainer.show();

}

$('.favorites-link').on('click', navFavoritesClick)

