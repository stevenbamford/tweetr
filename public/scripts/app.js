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


 function createTweetElement (tweetObj){

  let dateCreated = Date.now() - tweetObj["created_at"];
  let daysCreatedAgo = Math.round(dateCreated / 8.64e7);
  let imgSrc = tweetObj.user.avatars.small;

  let $tweet = $("<article>").addClass("tweet");
  let $tweetHeader = $("<header>");
  let $tweetContent = $("<p>" + tweetObj.content.text + "</p>");
  let $tweetFooter = $("<footer>" + daysCreatedAgo + " days ago</footer>");
  let $tweetFooterIcons = $("<div>");
  let $icon = $("<img>").attr("src", imgSrc);
  let $userName = $("<h2>" + tweetObj.user.name + "</h2>");
  let $handle = $("<h3>" + tweetObj.user.handle + "</h3>");
  let $flagIcon = $("<i>").addClass("fa fa-flag").attr("aria-hidden", "true");
  let $retweetIcon = $("<i>").addClass("fa fa-retweet").attr("aria-hidden", "true");
  let $heartIcon = $("<i>").addClass("fa fa-heart").attr("aria-hidden", "true");

  $tweetHeader.append($icon, $userName, $handle);

  $tweetFooterIcons.append($flagIcon, " ", $retweetIcon, " ", $heartIcon);
  $tweetFooter.append($tweetFooterIcons);

  $tweet.append($tweetHeader, $tweetContent, $tweetFooter);

  $($tweet).on("mouseenter", function(){

    $(this).find("footer div").css("display", "inline");
    $(this).find("header").css("opacity", "1");
  }).on("mouseleave", function(){

     $(this).find("footer div").css("display", "none");
     $(this).find("header").css("opacity", "0.5");

  });

  return $tweet;
 };

 function renderTweets (arrOfObjects){
  arrOfObjects.forEach(function(object){
    $("#tweets-container").append(createTweetElement(object));
  });
 }



