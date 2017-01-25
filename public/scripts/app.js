/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function (){

  $(".new-tweet form").on("submit", function(event){

    if($(this).closest("textarea").context["0"].textLength > 140){
       event.preventDefault();
       alert("Too many characters");
       return;
     }

    if(!$(this).closest("textarea").context["0"].value){
      event.preventDefault();
      alert("Please enter a tweet!");
      return;
    }
   let data = $(this).serialize();
   event.preventDefault();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: data
    });
  });

  $("article.tweet").on("mouseenter", function(){
    $(this).find("footer div").css("display", "inline");
    $(this).find("header").css("opacity", "1");

  }).on("mouseleave", function(){
     $(this).find("footer div").css("display", "none");
     $(this).find("header").css("opacity", "0.5");
  });

  function loadTweets(){

    $.ajax({
      url: "/tweets",
      method: 'GET',
      success: function (response) {
        renderTweets(response);
      }
    });
  };
  loadTweets();
});

function calcWhenTweeted(tweetObj){
  let dateCreated = Date.now() - tweetObj["created_at"];
  let createdAgo = dateCreated / 1000 ;

  if(createdAgo > 31557600){
    createdAgo = Math.floor(createdAgo/ 3155760);
    return createdAgo + " years ago";
  }
  if(createdAgo > 86400){
    createdAgo = Math.floor(createdAgo/ 86400);
    return createdAgo + " days ago";
  }
  if(createdAgo > 3600){
    createdAgo = Math.floor(createdAgo/ 3600);
    return createdAgo + " hours ago";
  }
  if(createdAgo > 60){
    createdAgo = Math.floor(createdAgo/ 60);
    return createdAgo + " minutes ago";
  }
  if(createdAgo < 60){
    createdAgo = Math.floor(createdAgo);
    return createdAgo + " seconds ago";
  }
}


function appendToHeader(tweetObj){
  const $tweetHeader = $("<header>");
  const imgSrc = tweetObj.user.avatars.small;
  const $avatar = $("<img>").attr("src", imgSrc);
  const $userName = $("<h2>").text(tweetObj.user.name);
  const $handle = $("<h3>").text(tweetObj.user.handle);

  $tweetHeader.append($avatar, $userName, $handle);

  return $tweetHeader;
}

function appendToFooter(tweetObj){
  const timeWhenTweeted = calcWhenTweeted(tweetObj);
  const $tweetFooter = $("<footer>" + timeWhenTweeted + "</footer>");
  const $tweetFooterIcons = $("<div>");
  const $flagIcon = $("<i>").addClass("fa fa-flag").attr("aria-hidden", "true");
  const $retweetIcon = $("<i>").addClass("fa fa-retweet").attr("aria-hidden", "true");
  const $heartIcon = $("<i>").addClass("fa fa-heart").attr("aria-hidden", "true");

  $tweetFooterIcons.append($flagIcon, " ", $retweetIcon, " ", $heartIcon);
  $tweetFooter.append($tweetFooterIcons);

  return $tweetFooter;
}

 function createTweetElement(tweetObj){
  const $tweet = $("<article>").addClass("tweet");
  const header = appendToHeader(tweetObj);
  const tweetContent = $("<p>").text(tweetObj.content.text);
  const footer = appendToFooter(tweetObj);

  $tweet.append(header, tweetContent, footer);

  $($tweet).on("mouseenter", function(){

    $(this).find("footer div").css("display", "inline");
    $(this).find("header").css("opacity", "1");

  }).on("mouseleave", function(){
     $(this).find("footer div").css("display", "none");
     $(this).find("header").css("opacity", "0.5");
  });

  return $tweet;
 };

 function renderTweets(arrOfObjects){
  arrOfObjects.forEach(function(object){
    $("#tweets-container").append(createTweetElement(object));
  });
 }



