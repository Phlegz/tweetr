$(() => {
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
    $footer.append($p).append($iconMarkup);
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
    return $tweet;
  }

  function renderTweets(tweets) {
    $('#tweets-container').empty();
    tweets.forEach((tweetData) => {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    })
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'get'
    }).done((data) => {
      renderTweets(data)
    });
  }

  loadTweets();

  const $form = $('form');
  
  $form.on('submit', function(e) {
    e.preventDefault();
    console.log('submitted');
    const form = $(this);
    $.ajax({
      url:'/tweets' ,
      method: 'post',
      data: form.serialize(),
    }).done((data) => {
      console.log(data);
      // renderTweets(data)
      loadTweets(data)
    })
    $form.find('textarea').val('');
  });

})
