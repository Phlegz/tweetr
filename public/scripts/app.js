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
      "text": "<script>alert('uh oh!');</script>"
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


$(document).ready(() => {
  function createHeaderElement(userInfo) {
    const $header = $('<header>');
    const $img = $('<img/>').attr({
      'class': 'user-avatar',
      'src': userInfo.avatars.small,
      'alt': 'User Avatar'
    })
    const $pName = $('<p>').text(userInfo.name).addClass('name');
    const $pUsername = $('<p>').text(userInfo.handle).addClass('username');
    $header.append($img).append($pName).append($pUsername);
    return $header;
  }

  function createContent(content) {
    const $p = $('<p>').text(content.text).addClass('content');
    return $p;
  }

  function createFooter(time) {
    const $footer = $('<footer>');
    const $p = $('<p>').text(Math.round(time*1.15741e-8) + ' days ago');
    // const $icons = $('div').addClass('icons');
    const $iconMarkup = $(`
    <div class='icons '>
      <i class="fa fa-flag" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
    `);

    $footer.append($p).append($iconMarkup)
    return $footer;
  }

  function createTweetElement(tweet) {
    const $tweet = $("<article>").addClass("tweet-box");
    const $header = createHeaderElement(tweet.user);
    const $p = createContent(tweet.content);
    const $footer = createFooter(tweet.created_at);
    $tweet.append($header);
    $tweet.append($p);
    $tweet.append($footer);
    return $tweet
  }

  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach((tweetData) => {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    })
  }

  renderTweets(data);

})
