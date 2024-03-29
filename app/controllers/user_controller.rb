
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
    data = service.fetch user_params
    if data
      token = service.generate_token data
      render json: { :data => data, :friends => data.friends, :token => token }, :status => 200
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
    render json: {data: @user, friends: @user.friends, followers: @user.followers}, status: 200
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
    relationship = service.follow params
    render json: {data: relationship, status: "ok"}, status: 201
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
    render json: {:data => user}, status: 201
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




  private

  def user_params
    params.require(:user).permit(:username, :password, :firstname, :lastname, :lga, :phone, :email, :nt_token, :role, :ward, :avatar, :state, :dob)
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
