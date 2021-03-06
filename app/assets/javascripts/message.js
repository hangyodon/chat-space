$ (function (){

  function buildHtml(message){
    if (message.image) {
      var html =
      `<div class="main-chat__messages__message" data-message-id=${message.id}>
        <div class="main-chat__messages__message__upper-info">
          <div class="main-chat__messages__message__upper-info__talker">
            ${message.user_name}
          </div>
          <div class="main-chat__messages__message__upper-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__messages__message__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        <img class="lower-message__image" src=${message.image} alt="2019040801">
        </div>`
      return html;
    } else {
      var html =
      `<div class="main-chat__messages__message" data-message-id=${message.id}>
        <div class="main-chat__messages__message__upper-info">
          <div class="main-chat__messages__message__upper-info__talker">
            ${message.user_name}
          </div>
          <div class="main-chat__messages__message__upper-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__messages__message__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $(".new_message").on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this). attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHtml(data);
      $('.main-chat__messages').append(html);
      $('form')[0].reset();
      $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      $('.main-chat__message-form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.main-chat__messages__message:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i,message) {
        insertHTML += buildHtml(message)
      });
      $('.main-chat__messages').append(insertHTML);
      $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});