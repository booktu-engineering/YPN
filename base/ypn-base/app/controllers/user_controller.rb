
class UserController < ApplicationController

  meta_information_service = MetaInformationService.new(MetaInformation)
  user_service_object = UserService.new(User)


  def signup
    begin
    data = user_service_object.signup(user_params)
    render json: {data: data}, status: 201
    rescue StandardError => e
      unprocessable_entity e
    end
  end



  def login
    begin
      data = user_service_object.login(login_params)
      render json: {:data => data}, status: 200
    rescue StandardError => e
      unprocessable_entity e
    end
  end



  def all
    data = user_service_object.fetch_all
    render json: { data: data }, status: 200
  end



  def show
    @user = user_service_object.fetch_one('id', params[:id].to_i)
    if @user.present?
    render json: {user: @user}, status: 200
    return
    end
    resource_not_found
  end



  def follow
    begin
    relationship = user_service_object.follow(params)
    render json: {data: relationship, status: "ok"}, status: 201
    rescue StandardError => e
      unprocessable_entity e
    end
  end



  def fetch_users
  data = user_service_object.fetch_users[params[:body]]
  render json: { :data => data, :status => "ok" }, status: 200
  end



  def change_role
    begin
      data = user_service_object.change_role(params)
      render json: { :data => data, :status => 'ok'}, status: 200
    rescue StandardError => e
      puts e.message
      resource_not_found
    end
  end


  def logout
    render json: {:currentuser => nil }, status: 201
  end





  def update
    @user = User.find_by(username: params[:username])
    if @user
    @user.update(params[:user])
    render json: {user: @user}, status: 201
    return
    end
    resource_not_found
  end


  def destroy
    @user = User.find_by(username: params[:username]);
    if @user
      @user.destroy
      render json: {ok: true}, status: 204
      return
    end
    resource_not_found
  end


  # This should be tokenized



  def timeline
    begin
    @user = User.find_by(id: params[:id].to_i)
    arr = []
    if @user
      @user.friends.each do |friend|
        arr.push friend.posts
      end
      render json: { posts: arr, status: "ok"}, status: 200
      return
    end
    e = StandardError.new('There is no such user')
  rescue StandardError
    render json: {:error => e.message}, status: 404
    end
  end




  #we'd use keys to identify which kind of 10, 11, 12, 13
  def apply_for_career
    @meta = META_INFORMATION_SERVICE.create({ :user_id => params[:user_id], :key => 10 })
  end

#confirm_status only super admins should be able access this route,
#only admin users should be able to access this route
  def confirm_meta
    @meta = MetaInformation.find_by({ id: params[:id] })
    if @meta
      @meta.update({ status: true })
      @user = User.find_by({ id: @meta.user_id })
      @user.meta[:keys] = @meta.key
      @user.save!
      render json: { :user => @user, status: 'ok'}, status: 200
    end
    unproccessable_entity
  end


  def create_sub_admin_group
    @group = SubAdminGroup.new(sub_admin_params)
    if @group.valid?
      @group.save
      render json: { :group => @user, status: 'ok'}, status: 200
    end
  end


  def fetch_all_sub_admin_groups
    @groups = SubAdminGroup.all
    @groups.collect do |group|
      group.members.collect do |member|
        User.find_by(member.to_i)
      end
    end
  end


  def add_or_remove_member
    @group = SubAdminGroup.find_by(id: params[:group_id].to_i)
    @user = User.find_by(id: params[:user_id].to_i)
    if @group && @user
      url_query_object = Rack::Utils.parse_nested_query  request.query_string
      type = url_query_object[:type]
      if type === 'add'
        if !@group.include?(@user.id)
        @group.members << @user.id
        end
      elsif type == 'remove'
        if @group.members.include?(@user.id)
          @group.members.delete(@user.id)
        end
      end
      @group.save
      render json: { :group => @group }, status: 200
    end
    resource_not_found
  end


  private

  def user_params
    params.require(:user).permit(:username, :password, :firstname, :lastname, :lga, :phone, :email)
  end

  def login_params
    params.require(:user).permit(:email, :password)
  end

  def sub_admin_params
    params.require(:group).permit(:name, :members)
  end

end

# send mail confirmation link by calling the mail service which is a separate api running independently;
# puts "sending mail to #{@user.email}"
# message = '<h3> Hello there this is an absolutely great time to sign up on booktu,
#             Here is a link to get things started <h3> '
# body = {:subject =>  "Welcome to booktu", :message => message }
# mail_content(@user[:email], body)
# return
#
# unproccessable_entity
