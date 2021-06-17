/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = function(tweetDataObj) {
  const $tweet = $(`<section class="posted-tweet">
  <article id="tweets-container">
    <header>
       <div class="avatar">
          <img src=${tweetDataObj.user.avatars} alt="avatar">
          <p>${tweetDataObj.user.name}</p>
        </div>
        <div>
          <p>${tweetDataObj.user.handle}</p>
        </div>
      </header>
  
      <p class="content-text">${escape(tweetDataObj.content.text)}</p>
  
    <footer>
      <div>
        <p>10 Days Ago</p>
      </div>
      <div>
        <span class="footer-flag"><i class="fas fa-flag"></i></span>
        <span class="footer-heart"><i class="fas fa-heart"></i></span>
        <span class="footer-arrows"><i class="fas fa-retweet"></i></span>
      </div>
    </footer>
  
  </article>
</section>`);
  return $tweet;
}

const renderTweets = function(tweetsArr) {
  // loops through tweets
  for (let tweetObj of tweetsArr) {
    // calls createTweetElement for each tweet
    let $tweetElement = createTweetElement(tweetObj);
    // takes return value and appends it to the tweets container
    $('.for-prepending-tweets').prepend($tweetElement);
  }

}

$(document).ready(function() {
  $('.tweet-form').on('submit',function(event){
    //prevent default post request
    event.preventDefault();
    //check input and give error if conditions not met
    let content = $('#tweet-text').val();
    if (content.length > 140) {
      return alert("Your tweet is too long")
    }
    if (content === "" || content === null) {
      return alert("You did not write anything")
    }
    //convert form -> textArea to query string format (name=value)
    let serializedContent = $(this).serialize()
    //clear textArea input field
    $('#tweet-text').val("");
    //set url to form action
    let url = $(this).attr('action');
    //create ajax POST request
    $.ajax({
      method: "POST",
      url: url,
      data: serializedContent
    })
    .then (function (data) {
      renderTweets(data)
    })
  })
//function to GET array from "/tweets" and render them in HTML format
  const loadTweets = function () {
    let url = "/tweets";

    $.ajax({
      method: "GET",
      url: url,
  })
  .then (function(data) {
    renderTweets(data)
  });
  }

  loadTweets();

});