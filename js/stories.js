"use strict";

const $bookForm = $('#book-submit-form');

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */


function checkForFovorite(favorites, storyID) {
  for (let fav of favorites) {
    if (fav.storyId === storyID) {
      return true;
    }
  }
  return false;
}

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);
  let iconColor =
    checkForFovorite(currentUser.favorites, story.storyId) ?
      "bi-star-fill" : "bi-star";
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <span><i  class = 'bi ${iconColor}'></i><span>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


/** getStoryDataAndAddToPage: Gets the input values from form, adds that new
 * story instance, updates the storyList instance, and adds the new storyList
 * to the page.
 */
async function getStoryDataAndAddToPage(evt) {
  evt.preventDefault();
  let author = $(".author-input").val();
  let title = $(".title-input").val();
  let url = $(".url-input").val();
  //No http://throws error
  let storyInputs = { title, author, url };

  let story = await storyList.addStory(currentUser, storyInputs);

  let $storyMarkup = generateStoryMarkup(story);
  $allStoriesList.prepend($storyMarkup);

  // storyList = await StoryList.getStories();
}

$bookForm.on('submit', getStoryDataAndAddToPage); // change to storyForm



async function handleFavoriteClick(evt) {
  evt.preventDefault();
  let storyID = evt.target.closest('li').id;
  const storyInstance = getStoryInstance(storyID);
  //if ogg
  await currentUser.addFavorite(storyInstance);
  //add favorites to list ui


  // removeFavorite


  // addfavorite(storyId)

}

function getStoryInstance(findID) {
  return storyList.stories.find(story => story.storyId === findID);
}



$(".stories-list").on('click', 'button', handleFavoriteClick)




