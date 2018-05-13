
class UserController < ApplicationController

  def signup
    @user = User.new(user_params)
    if @user.valid?
    @user.save
    #generate jsonwebtoken
    token = Auth.issue({ :user_id => @user[:id] })
    render json: {user: @user, token: token}, status: 201
    # send mail confirmation link by calling the mail service which is a separate api running independently;
    puts "sending mail to #{@user.email}"
    message = '<h3> Hello there this is an absolutely great time to sign up on booktu,
                Here is a link to get things started <h3> '
    body = {:subject =>  "Welcome to booktu", :message => message }
    mail_content(@user[:email], body)
    return
    end
    unproccessable_entity
  end


  def login
    @user = User.find_by(email: login_params[:email]);
    if(@user && @user.authenticate(login_params[:password]))
    token = Auth.issue({ :user_id => @user[:id] })
    render json: { user: @user, token: token }, status: 201
    return
    end
    unproccessable_entity
  end


  def all
    @users = User.all;
    render json: {users: @users}, status: 200
  end


  def show
    @user = User.find_by(id: params[:id])
    if @user
    render json: {user: @user}, status: 200
    return
    end
    resource_not_found
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


  def follow
    @user = User.where(id: params[:follower_id].to_i);
    @followed_user = User.where(id: params[:followed_id].to_i);
    if @user && @followed_user
      Relationship.create!({ follower_id: params[:follower_id].to_i, followed_id: params[:followed_id].to_i });
      render json: { user: @user, status: "ok"}, status: 201
      return
    end
    resource_not_found
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


  private

  def user_params
    params.require(:user).permit(:username, :password, :firstname, :lastname, :lga, :phone, :email)
  end

  def login_params
    params.require(:user).permit(:email, :password)
  end

end
