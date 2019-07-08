$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    image = ( message.image_url ) ? `<img class= "lower-message__image" src=${message.image_url} >` : "";
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
            ${image}
          </div>`
    return html;
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

  var reloadMessages = function() {  
    
    group_id = $('.main-header__left-box__current-group').data("group-id");

    if ($('div').hasClass('form')){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      // ここの記述でメッセージテーブルのidの一番最後のものを持ってくる。
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: `/groups/${group_id}/api/messages/`, //サーバを指定。今回はgroups/:group_id/api/messagesに処理を飛ばす
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'GET',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {group_id: group_id,
        last_id: last_message_id}
      })
      .done(function(messages) {
        // 0の時はスクロールしないようにする
        var insertHTML = '';
        messages.forEach(function (message){
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      
      })
    .fail(function() {
      });

    }
    
  }
  setInterval(reloadMessages, 
    5000);
});

// メッセージ画面でのみ自動更新できるようにする
