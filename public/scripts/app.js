/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 var tweetData = {
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
}


$(document).ready(function (){

  $("article.tweet").on("mouseenter", function(){

    $(this).find("footer div").css("display", "inline");
    $(this).find("header").css("opacity", "1");
  }).on("mouseleave", function(){

     $(this).find("footer div").css("display", "none");
     $(this).find("header").css("opacity", "0.5");

  });
  let $tweet = createTweetElement(tweetData);
  $("#tweets-container").append($tweet);
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


