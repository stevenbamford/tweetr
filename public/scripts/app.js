$(document).ready(function (){

  function calcWhenTweeted(tweetObj){
    let dateCreated = Date.now() - tweetObj["created_at"];
    let createdAgo = dateCreated / 1000 ;

  switch (true){

    case (createdAgo > 31557600):
      createdAgo = Math.floor(createdAgo / 3155760) + " years ago" ;
      break;

    case (createdAgo > 86400):
      createdAgo = Math.floor(createdAgo / 86400) + " days ago";
      break;

    case (createdAgo > 3600):
      createdAgo = Math.floor(createdAgo / 3600) + " hours ago";
      break;

    case (createdAgo > 60):
      createdAgo = Math.floor(createdAgo / 60) + " minutes ago";
      break;

    case (createdAgo < 60):
      createdAgo = Math.floor(createdAgo) + " seconds ago";
      break;
  }
  String(createdAgo);

  if(createdAgo.split(" ")[0] === "1"){
    createdAgo = createdAgo.replace("s", "");
  }
  return createdAgo
}

  function appendToHeader(tweetObj){
    const $tweetHeader = $("<header>");
    const imgSrc = tweetObj.user.avatars.small;

    $("<img>").attr("src", imgSrc).appendTo($tweetHeader);
    $("<h2>").text(tweetObj.user.name).appendTo($tweetHeader);
    $("<h3>").text(tweetObj.user.handle).appendTo($tweetHeader);

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
  }

  function renderTweets(arrOfObjects){
    arrOfObjects.forEach(function(object){
      $("#tweets-container").prepend(createTweetElement(object));
    });
  }

  function loadTweets(){
    $.ajax({
      url: "/tweets",
      method: 'GET'
    }).then(function(response){
      renderTweets(response);
    });
  }
  loadTweets();

  $("#nav-bar button").on("click", function (){
    $(".new-tweet").stop().slideToggle("fast");
    $(".new-tweet textarea").focus();
  });


  $(".new-tweet form").on("submit", function(event){

    if($(this).find("textarea").val().length > 140){
      event.preventDefault();
      alert("Too many characters");
      return;
    }

    if(!$(this).find("textarea").val()){
      event.preventDefault();
      alert("Please enter a tweet!");
      return;
    }

    event.preventDefault();
    $(this).find(".counter").text(140);
    $("#tweets-container").empty();
    $("#loadingGIF").show();

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    }).then(function(){
      $("#loadingGIF").hide();
      loadTweets();
    });

    $(".new-tweet textarea").val("");
  });

  $("article.tweet").on("mouseenter", function(){
    $(this).find("footer div").css("display", "inline");
    $(this).find("header").css("opacity", "1");

  }).on("mouseleave", function(){
    $(this).find("footer div").css("display", "none");
    $(this).find("header").css("opacity", "0.5");
  });

});

