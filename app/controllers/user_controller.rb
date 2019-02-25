
class UserController < ApplicationController
  skip_before_action UserFilter::LoggedInOnly, only: [:signup, :login, :render_user, :send_reset_password, :reset_password, :confirm_mail ]
  before_action :check_for_null_input, only: [:signup, :login, :update]


  def initialize
    @service = UserService.new(User)
  end


  def signup
    begin
    data = service.signup(user_params)
    render json: {data: data}, status: 201
     send_confirm_email data[:user].id
    rescue StandardError, ActiveRecord::RecordInvalid => e
      if e.class === ActiveRecord::RecordInvalid
        return conflict e
      end
      unproccessable_entity e
    end
  end



  def login
    begin
      data = service.login(login_params)
      render json: {:data => data}, status: 200
    rescue StandardError => e
      request_forbidden e
    end
  end



  def render_user
    user = service.fetch(user_params)
    if user
      token = service.generate_token(user)
      render json: { :data => user, :friends => user.friends, :blocked_users => user.blocked_users, :token => token }, :status => 200
      return
    end
    resource_not_found
  end



  def send_reset_password
    begin
      data = service.send_reset_password params[:id]
      render json: { :data => data, :status => 'ok'}, :status => 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end


  def send_confirm_email id
    data = User.find_by(id: id.to_i)
    if data
      payload = { :id => data.id }
      token = Auth.issue payload
      link = "https://ypn-web.firebaseapp.com/confirm/mail/?tk=#{token}"
      body = { :destination => data.email, :subject => 'Welcome to Youth Party Nigeria', :link => link, :username => data[:username] }
      payload = { :key => 1, :mail => body, :notification => { :destination => data.username }, :emailOnly => true }
      dispatch_notification payload
      return token
    end
    raise StandardError.new('Sorry, we couldnt find that user')
  end



  def reset_password
    begin
      data = service.reset_password params[:tk]
      render json: { :data => data, :status => 'ok'}, :status => 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end


  def new_party_member
    begin
      data = service.new_party_member params
      render json: { :data => data, :status => 'ok'}, :status => 200
    rescue StandardError => e
      unproccessable_entity e
    end

  end



  def confirm_mail
    begin
      data = service.confirm_email params[:tk]
      render json: { :data => data, :status => 'ok'}, :status => 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end



  def show
    @user = service.fetch_one('id', params[:id].to_i)
    if @user
     token = service.generate_token @user
    render json: {data: @user, friends: @user.friends, blocked_users: @user.blocked_users, followers: @user.followers, token: token }, status: 200
    return
    end
    resource_not_found
  end



  def fetch
    @user = service.fetch_one('username', params[:username])
    render json: {data: @user}, status: 200
  end



  def follow
    begin
    data = service.follow params
    render json: {data: data[:relationship], status: "ok"}, status: 201
    dispatch_notification data[:payload]
    rescue StandardError => e
      unproccessable_entity e
    end
  end



  def logout
    render json: {:currentuser => nil }, status: 201
  end



  def update
    begin
    user = service.update_one('id', current_user['id'].to_i, user_params)
    token = service.generate_token user
    render json: {:data => user, :token => token}, status: 201
    rescue StandardError => e
    unproccessable_entity e
    end
  end



  def destroy
    begin
      status = service.delete_one?('id', current_user['id'].to_i)
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
  data = service.fetch_users[params[:body]]
  render json: { :data => data, :status => "ok" }, status: 200
  end

 
  def block_user
    if params[:type] == 'block'
      current_user.blocking_relationships.create(blocked_user_id: params[:id])
    end
     if params[:type] == 'unblock'
      relationships = current_user.blocking_relationships.where(blocked_user_id: params[:id])
      relationships.destroy
    end
    render json: { message: 'Done' }, status: 200
  end 


  private

  def user_params
    params.require(:user).permit(:username, :password, :firstname, :lastname, :lga, :phone, :email, :nt_token, :role, :ward, :avatar, :state, :dob, :bio, :vin)
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
        if value.to_s.length < 1
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
