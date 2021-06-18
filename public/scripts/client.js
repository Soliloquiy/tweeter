/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//SETUP ================================================================================================================================
//escape function for user input
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//function to insert data into respective html elements
const createTweetElement = function(tweetDataObj) {
  const time = tweetDataObj.created_at;
  const timeAgo = timeago.format(time);
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
        <p>${timeAgo}</p>
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
};

//function to attach elements to container for new tweets
const renderTweets = function(tweetsArr) {
  // loops through tweets
  for (let tweetObj of tweetsArr) {
    // calls createTweetElement for each tweet
    let $tweetElement = createTweetElement(tweetObj);
    // takes return value and appends it to the tweets container
    $('.for-prepending-tweets').prepend($tweetElement);
  }

};

//function to GET array from "/tweets" and render them in HTML format
const loadTweets = function() {
  let url = "/tweets";

  $.ajax({
    method: "GET",
    url: url,
  })
    .then(function(data) {
      renderTweets(data);
    });
};
//SETUP COMPLETE =========================================================================================================================

//FORM SUBMIT EVENT HANDLING =============================================================================================================
$(document).ready(function() {
  
  loadTweets();
  //hide error message
  $('.new-tweet-error').hide();
  //initiate form handler for submit
  $('.tweet-form').on('submit',function(event) {
    //prevent default post request
    event.preventDefault();
    //remove add red class from counter
    $('.counter').removeClass("add-red-to-new-tweet")
    //reset counter to 140 upon submit request
    $('.counter').html(140);
    //hide if no errors
    $('.new-tweet-error').slideUp("slow");
    //check input and give error if conditions not met
    const content = $('#tweet-text').val();
    let errMessage = "";
    if (!content) {
      errMessage = 'You need to write a message...';
    }
    if (content.length > 140) {
      errMessage = 'Your message is too long...';
    }
    $('.new-tweet-error').text(errMessage);
    if (errMessage) {
      $('.new-tweet-error').slideDown();
      //clear text area
      $('#tweet-text').val("");
      return;
    }
    //convert form -> textArea to query string format (name=value)
    let serializedContent = $(this).serialize();
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
      .then(function(data) {
        renderTweets(data);
      });
  });
});
//FORM SUBMIT EVENT HANDLING COMPLETE =========================================================================================================================