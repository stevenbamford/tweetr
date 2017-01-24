$(document).ready(function (){

  $(".new-tweet textarea").on("keyup", function(){
    let numChars = $(this).val().length;
    let charsRemaining = 140 - numChars;
    $(this).closest("form").find(".counter").text(charsRemaining);
    if(charsRemaining > 0){
      $(this).closest("form").find(".counter").css("color", "#244751");
    }else{
      $(this).closest("form").find(".counter").css("color", "red");
    }
  });

});