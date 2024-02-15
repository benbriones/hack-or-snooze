"use strict";

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

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
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
  let authorInput = $(".author-input").val();
  let titleInput = $(".title-input").val();
  let urlInput = $(".url-input").val();
  //No http://throws error
  let storyInputs = { title: titleInput, author: authorInput, url: urlInput };
  await storyList.addStory(currentUser, storyInputs);
  storyList = await StoryList.getStories();
  putStoriesOnPage();
}

$('#book-submit-form').on('submit', getStoryDataAndAddToPage);