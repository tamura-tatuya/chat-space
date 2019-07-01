json.id @message.id
json.content  @message.content
json.image_url  @message.image.url
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name

# userの部分がアソシエーションでuserテーブルから引っ張ってきている
# 他のテーブルからアソシエーショんで引っ張って行くときは、そのテーブルのカラム名を引っ張ってくる
