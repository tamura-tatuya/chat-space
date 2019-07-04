class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end
# newアクションでは@groupというインスタンス変数を定義しています。「@group.users << current_user」と記述することで、現在ログイン中のユーザーを、新規作成したグループに追加しています
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end
  # createアクション内はグループ作成の可否にあわせた処理を記述します。
# 失敗したときはredirect_toではなく、renderを使用します。
# redirect_toがHTTPリクエストを送り、そのレスポンスとして返ってくるビューを表示するのに対し、renderはHTTPリクエストを送らず、該当するビューだけを表示します。
  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end
  # グループを編集した後group_messages_path(@group)トップページのどのグループのページに飛ぶかを指定している

  private

  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end
# 　  ここのコードでグループparamsのnameとユーザーidだけを取り出す
  def set_group
    @group = Group.find(params[:id])
  end
end
