/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
  
      <p class="content-text">${tweetDataObj.content.text}</p>
  
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
    let $tweetElement = createTweetElement(tweetObj)
    // takes return value and appends it to the tweets container
    $('.container').append($tweetElement)
  }

}

$('.tweet-form').on('submit',function(){
  console.log("works");
})