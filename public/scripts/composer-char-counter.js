$(document).ready(function() {
  const textArea = $("#tweet-text");
  // const counter = document.getElementById("counter");
  textArea.on("keypress", function(event) {
    console.log($(this).val());
    const counter = $(this).closest(".new-tweet").find(".counter")
    $(counter).val((140 - (this.value.length + 1)));
    // console.log(this.parent())
    //find children after parent
    // console.log(this.value.length);
    // counter.value = (140 - (this.value.length + 1))
    
  })


});