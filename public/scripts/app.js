$(function() {

  //==============================******* Helper functions ******==============================
  function createTweetBoxHeader(userInfo) {
    const $header = $('<header>');
    const $img = $('<img/>').attr({
      'class': 'user-avatar',
      'src': userInfo.avatars.small,
      'alt': 'User Avatar'
    });
    const $name = $('<p>').text(userInfo.name).addClass('name');
    const $username = $('<p>').text(userInfo.handle).addClass('username');
    $header.append($img).append($name).append($username);
    return $header;
  }

  function createTweetBoxContent(content) {
    const $p = $('<p>').text(content.text).addClass('content');
    return $p;
  }

  function createTweetBoxFooter(time) {
    const $footer = $('<footer>');
    const $p = $('<p>').text(time);
    const $iconMarkup = $(`
    <div class='icons'>
      <i class='fa fa-flag' aria-hidden='true'></i>
      <i class='fa fa-retweet' aria-hidden='true'></i>
      <i class='fa fa-heart' aria-hidden='true'></i>
    </div>
    `);
    $footer.append($p).append($iconMarkup);
    return $footer;
  }

  function createTweetBoxElement(tweet) {
    const $tweet = $('<article>').addClass('tweet-box');
    const $header = createTweetBoxHeader(tweet.user);
    const $p = createTweetBoxContent(tweet.content);
    const $footer = createTweetBoxFooter(moment(tweet.created_at).fromNow());
    $tweet.append($header);
    $tweet.append($p);
    $tweet.append($footer);
    return $tweet;
  }

  function renderTweets(tweets) {
    $('#tweets-container').empty();
    tweets.forEach((tweetData) => {
      const $tweet = createTweetBoxElement(tweetData);
      $('#tweets-container').prepend($tweet);
    });
  }

//================================****** Main functions declaration ******======================
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'get'
    }).done((data) => {
      renderTweets(data);
    });
  }

  function submitForm() {
    const $form = $('#tweet-submit-form');
    $form.on('submit', function(event) {
      event.preventDefault();
      const form = $(this);
      if (!form.find('textarea').val().trim().length) {
        alert('Can not post empty content!');
        return;
      }
      if (form.find('textarea').val().length > 140) {
        const content = form.find('textarea').val();
        alert('Exceeds the max allowed character!');
        form.find('textarea').val(content);
        return;
      }
      $.ajax({
        url:'/tweets' ,
        method: 'post',
        data: form.serialize(),
      }).done((data) => {
          loadTweets(data);
        });
      form.find('textarea').val('');
      form.find('.counter')[0].innerHTML = '140';
    });
  }

  function toggleComposeButton() {
    $('#compose').click(function() {
      $('.new-tweet').slideToggle();
      if($('.new-tweet')[0].style.display === 'block') {
        $('.new-tweet').find('textarea').focus();
      }
    });
  }

//=============================******* Function Invocations *******=================================
  loadTweets();
  submitForm();
  toggleComposeButton();

});
