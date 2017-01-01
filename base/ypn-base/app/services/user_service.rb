
class UserService < BaseService

  def signup body
    puts body
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
    raise StandardError.new('Sorry, those credentials dont match')
  end



  def fetch query
    user = self.model.find_by(query)
    return user
  end



  def follow body
    user = self.model.where(id: body[:current_user][:id].to_i);
    followed_user = self.model.where(id: body[:id].to_i);
    relationship = Relationship.where({ follower_id: body[:current_user][:id].to_i, followed_id: body[:id].to_i })
    if user && followed_user && !relationship.present?
      relationship = Relationship.create!({ follower_id: body[:current_user][:id].to_i, followed_id: body[:id].to_i });
      return relationship
    end
    raise StandardError.new('Sorry we couldnt find any user like that')
  end



  def change_role body
    user = self.model.find_by(id: body[:id].to_i)
    if user.present?
      user.role = body[:role].to_i
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



  def new_party_member body
    data = self.model.find_by(id: body[:id].to_i)
    if data && data.role === 0
      #generate new private id
      id = generate_member_id
      puts id
      data.update({ :membership_number => id, role: 1 })
      return data
    end
    raise StandardError.new('Sorry this request is invalid')
  end



  def reset_password token
    begin
      payload = Auth.decode token
      payload = payload[0]
      data = self.model.find_by(id: payload['id'].to_i)
      if data && data.reset_password_count === payload['reset_password_count'].to_i
        data.reset_password_count ||= 0
        data.reset_password_count += 1
        data.save!
        return data
      end
      raise StandardError.new('Is this link still valid? We guess not. Please make this request again')
    rescue StandardError => e
      raise e
    end
  end




  def confirm_email token
    begin
      payload = Auth.decode token
      payload = payload[0]
      data = self.model.find_by(id: payload['id'].to_i)
      if data && !data.confirmed_email
        data.confirmed_email = true
        data.save!
        return data
      end
      raise StandardError.new('Sorry that token is invalid or something')
    rescue StandardError => e
      raise e
    end
  end



  def send_reset_password id
    data = self.model.find_by(id: id.to_i)
    if data
      payload = { :id => data.id, :reset_password_count => data.reset_password_count }
      token = Auth.issue payload
      link = "http://localhost:3000/reset/password/?tk=#{token}"
      message = " <h5> Hello #{data.username}, You requested to change your password, Here's the link to do that  <br/> #{link}</h5>"
      subject = " Reset your password"
      # dispatch_email data.email, message, subject
      return token
    end
    raise StandardError.new('Sorry, we couldnt find that user')
  end


  def send_confirm_email id
    data = self.model.find_by(id: id.to_i)
    if data
      payload = { :id => data.id }
      token = Auth.issue payload
      link = "http://localhost:3000/confirm/email/?tk=#{token}"
      message = " <h5> Hello, <br/> Welcome to Youth Party Nigeria! <br/> You might want to confirm your email to enjoy certain privileges, Here's the link to do that  <br/> #{link}</h5>"
      subject = " Reset your password"
      # dispatch_email data.email, message, subject
      return token
    end
    raise StandardError.new('Sorry, we couldnt find that user')
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

private
def generate_member_id
  arr = [ '0', '1', '2', '3', '4', '5', 'A', 'B', 'C', 'D', 'E', 'F']
  str = 'YPN-'
  6.times do
    index = Random.rand((arr.length.to_i - 1))
    str = "#{str}#{arr[index]}"
  end
  return str
end


end

# message = '<h3> Hello there this is an absolutely great time to sign up on booktu,
#             Here is a link to get things started <h3> '
# body = {:subject =>  "Welcome to booktu", :message => message }
# # mail_content(@user[:email], body)
