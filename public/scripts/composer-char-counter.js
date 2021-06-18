//this script updates the character counter value and style in our form
$(document).ready(function() {
  const textArea = $("#tweet-text");
  // const counter = document.getElementById("counter");

  textArea.on("keyup", function() {
    //target counter value through form element search
    const counter = $(this).closest(".new-tweet").find(".counter");
    //update counter on event
    $(counter).html((140 - (this.value.length)));
    //add red to new-tweet with css if above maximum
    if ($(this).val().length > 140) {
      counter.addClass("add-red-to-new-tweet");
    } else {
      counter.removeClass("add-red-to-new-tweet");
    }
  });

});