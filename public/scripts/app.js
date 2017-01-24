/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function (){

  $("article.tweet").on("mouseenter", function(){
    $(this).find("footer div").css("display", "inline");
    $(this).find("header").css("opacity", "1");

  }).on("mouseleave", function(){
     $(this).find("footer div").css("display", "none");
     $(this).find("header").css("opacity", "0.5");
  });

  renderTweets(data);
});

function calcWhenTweeted(tweetObj){
  let dateCreated = Date.now() - tweetObj["created_at"];
  let createdAgo = Math.round(dateCreated / 8.64e4);

  if(createdAgo > 31557600){
    createdAgo = createdAgo/ 31557600;
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
  }else{
    createdAgo = Math.floor(createdAgo);
    return createdAgo + " seconds ago";
  }
}


function appendToHeader(tweetObj){
  const $tweetHeader = $("<header>");
  const imgSrc = tweetObj.user.avatars.small;
  const $avatar = $("<img>").attr("src", imgSrc);
  const $userName = $("<h2>" + tweetObj.user.name + "</h2>");
  const $handle = $("<h3>" + tweetObj.user.handle + "</h3>");

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
  const tweetContent = $("<p>" + tweetObj.content.text + "</p>");
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



