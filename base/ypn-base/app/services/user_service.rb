
class UserService < BaseService

  def signup body
    user = self.model.new(body)
    if user.valid?
    user.save
    token = Auth.issue({ :user_id => user[:id] })
    return { user: user, token: token }
    end
    raise ArgumentError.new('Please pass in the right values')
  end



  def login body
    user = self.model.find_by(email: body[:email]);
    if(user && user.authenticate(body[:password]))
    token = Auth.issue({ :user_id => user[:id] })
    return { user: user, token: token }
    end
    raise StandardError.new('Sorry we could not find any user like that')
  end



  def follow body
    user = self.model.where(id: body[:follower_id].to_i);
    followed_user = self.model.where(id: body[:followed_id].to_i);
    relationship = Relationship.where({ follower_id: body[:follower_id].to_i, followed_id: body[:followed_id].to_i })
    if user && followed_user && !relationship.present?
      relationship = Relationship.create!({ follower_id: body[:follower_id].to_i, followed_id: body[:followed_id].to_i });
      return { :data => relationship }
    end
    raise StandardError.new('Sorry we couldnt find any user like that')
  end



  def change_role body
    user = self.model.find_by(id: body[:id].to_i)
    if user.present?
      user.role = body[:role]
      user.save!
      return user
    end
    raise StandardError.new('Sorry there is no user like that');
  end



  def fetch_users body
    data = self.model.all
    data = data.select do |item|
      body.include? item.id
    end
    return data
  end



  def timeline
    begin
    @user = self.model.find_by(id: params[:id].to_i)
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




end

# message = '<h3> Hello there this is an absolutely great time to sign up on booktu,
#             Here is a link to get things started <h3> '
# body = {:subject =>  "Welcome to booktu", :message => message }
# # mail_content(@user[:email], body)
