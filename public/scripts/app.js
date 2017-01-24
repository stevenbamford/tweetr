/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function (){

  $(".tweet").on("mouseover", function(){

    $(".tweet footer div").css("display", "inline");
    $("article.tweet header").css("opacity", "1");
  }).on("mouseleave", function(){

     $(".tweet footer div").css("display", "none");
     $("article.tweet header").css("opacity", "0.5");

  });

});