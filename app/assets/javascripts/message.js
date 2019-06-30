$(function(){
  function buildHTML(message){
    if ( message.image_url ) {
    var html = 
    `<div class="message">
        <div class="upper-message">
          <div class="upper-message__user-name">
          ${message.user_name}
          </div>
          <div class="upper-message__date">
          ${message.date}
          </div>
        </div>
          <div class="lower-message">
            <p class="lower-message__content">
            ${message.content}
            </p>
            <img class="lower-message__image" src= "${message.image_url}" alt="">
            </div>
          </div>`
    return html;
} else {
  var html =
   `<div class="message" data-message-id=${message.id}>
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.date}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
    </div>`
  return html;
  };
}
 $('#new_message').on('submit',function(e){
   e.preventDefault();
     var formData = new FormData(this);
     var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html)
    $('form')[0].reset();
    $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast'); 
    // .message_contentでメッセージを書き込むクラスを指定、Val('')で実行するたびに記述するとこを消す
  })
  .fail(function(){
    alert('error');
  });
  return false;
 });
});
