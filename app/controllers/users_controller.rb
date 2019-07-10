class UsersController < ApplicationController

  def index
    @users =  User.where('name LIKE(?) AND id != ?', "%#{params[:keyword]}%", current_user.id)
    # LIKEnameあいまい検索をかけて!=?で一致しないとゆう意味、LIKE(?)１個目で#{params[:keyword]}をさし、２個目の？でcurrent_user.idをさす
      respond_to do |format|
        format.html
        format.json
    end 
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end

# Userモデルの更新を行うupdateアクションは、保存をできた場合、できなかった場合で処理を分岐しています。
    # Rubyのif文は、hogehoge.create , hogehoge.updateといった処理を条件に設定することができます。処理が実行されたらtrue、実行されなければfalseを返します。
    # 今回の場合は、current_user.updateに成功した場合、rootにリダイレクトし、失敗した場合、editのビューを再度描画する、という記述
        # editアクションでは必要になるインスタンス変数はないので、アクションを定義するだけで大丈夫です。
