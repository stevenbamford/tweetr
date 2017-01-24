/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function (){

  $(".tweet").on("mouseover", function(){

    $(".tweet footer div").css("display", "inline");
    $("article.tweet h2").css("color", "#244751");
    $("article.tweet").css("border", "1px solid #244751");
    $("article.tweet h3" ).css("color", "#244751");
    $("article.tweet img").css("opacity", 1);

  }).on("mouseleave", function(){

    $(".tweet footer div").css("display", "none");
    $("article.tweet h2").css("color", "#667E85");
    $("article.tweet").css("border", "1px solid #ADADAD");
    $("article.tweet h3" ).css("color", "#ADADAD");
    $("article.tweet img").css("opacity", 0.5);

  })

});