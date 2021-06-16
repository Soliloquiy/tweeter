$(document).ready(function() {
  const textArea = $("#tweet-text");
  // const counter = document.getElementById("counter");
  textArea.on("keypress", function(event) {
    const counter = $(this).closest(".new-tweet").find(".counter")
    $(counter).val((140 - (this.value.length + 1)));

    //add red to new-tweet with css
    if ($(this).val().length > 140) {
      counter.addClass("add-red-to-new-tweet");
    } else {
      counter.removeClass("add-red-to-new-tweet")
    }
  })

});