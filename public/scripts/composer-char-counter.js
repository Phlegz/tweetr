$(document).ready(() => {
  const textArea = $('.new-tweet').find('textarea')[0];

  $(textArea).on("keyup", function() {
    const charTyped = $(this).val().length ;
    const charRemaining = 140 - charTyped;
    const counter = $(this).siblings('.counter')[0];
    if (charRemaining >= 0) {
        $(counter).text(charRemaining).css('color', 'black');
    } else {
        $(counter).text(charRemaining).css('color', 'red');
    }
  });
  console.log('ready');
})
