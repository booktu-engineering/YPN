
class UserController < ApplicationController
  skip_before_action UserFilter::LoggedInOnly, only: [:signup, :login]
  before_action :check_for_null_input, only: [:signup, :login, :update]


  meta_information_service = MetaInformationService.new(MetaInformation)
  USER_SERVICE_OBJECT = UserService.new(User)

  def signup
    begin
    data = USER_SERVICE_OBJECT.signup(user_params)
    render json: {data: data}, status: 201
    rescue StandardError => e
      puts e
      unproccessable_entity e
    end
  end



  def login
    begin
      data = USER_SERVICE_OBJECT.login(login_params)
      render json: {:data => data}, status: 200
    rescue StandardError => e
      request_forbidden e
    end
  end


####  Protected routes #######


#logged in routes
  def show
    @user = USER_SERVICE_OBJECT.fetch_one('id', params[:id].to_i)
    if @user
    render json: {data: @user}, status: 200
    return
    end
    resource_not_found
  end


  def follow
    begin
    relationship = USER_SERVICE_OBJECT.follow(params)
    render json: {data: relationship, status: "ok"}, status: 201
    rescue StandardError => e
      unprocessable_entity e
    end
  end


  def logout
    render json: {:currentuser => nil }, status: 201
  end



  def update
    begin
    user = USER_SERVICE_OBJECT.update_one('id', current_user['id'].to_i, user_params)
    render json: {:data => user}, status: 201
    rescue StandardError => e
    unproccessable_entity e
    end
  end


  def destroy
    begin
      status = USER_SERVICE_OBJECT.delete_one?('id', current_user['id'].to_i)
      if status
        render json: {ok: true}, status: 204
        return
      end
      raise StandardError.new('That didnt go through successfully')
    rescue StandardError => e
      deformed_process e
    end
  end

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

#external api
  def fetch_users
  data = user_service_object.fetch_users[params[:body]]
  render json: { :data => data, :status => "ok" }, status: 200
  end


#admin only routes
  def change_role
    begin
      data = user_service_object.change_role(params)
      render json: { :data => data, :status => 'ok'}, status: 200
    rescue StandardError => e
      puts e.message
      resource_not_found
    end
  end

  def all
    data = user_service_object.fetch_all
    render json: { data: data }, status: 200
  end







#logged in and admin


  # This should be tokenized








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

  def check_for_null_input
    if params['user']
      data = params['user']
      culprit = ''
      valid = true
      data.each do |key, value|
        if value.length < 1
          valid = false
          culprit = key
        end
      end
      if !valid
        e = StandardError.new("#{culprit} is empty or invalid, please check")
      return  unproccessable_entity e
      end
    end
    return
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
