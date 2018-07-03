require 'net/http'
require 'json'

class UserService < BaseService

  def signup body
    user = self.model.new(body)
    if user.valid?
    user.save
    token = generate_token user
    send_confirm_email user.id
    return { user: user, token: token }
    end
    raise ArgumentError.new('Please pass in the right values')
  end



  def login body
    user = self.model.find_by(email: body[:email]);
    if(user && user.authenticate(body[:password]))
    token = generate_token user
    return { user: user, token: token }
    end
    raise StandardError.new('Sorry, those credentials dont match')
  end



  def fetch query
    user = self.model.find_by(query)
    return user
  end



  def follow body
    user = self.model.find_by(id: body[:current_user][:id].to_i);
    followed_user = self.model.find_by(id: body[:id].to_i);
    relationship = Relationship.where({ follower_id: body[:current_user][:id].to_i, followed_id: body[:id].to_i })
    if user && followed_user && !relationship.present?
      if (body[:type] && body[:type] === '1')
        relationship.destroy
        return relationship
      end
      relationship = Relationship.create!({ follower_id: body[:current_user][:id].to_i, followed_id: body[:id].to_i });
      body = { :destination => followed_user.email, :subject => "#{user.username} followed you on YPN", :firstname => user.firstname,  :lastname => user.lastname, :username => user.username }
      notification = { :destination => followed_user.username, :message => "#{user.username} followed you", :type => 10, time: DateTime.now }
      nt_token = update_notification_token(followed_user, notification)
      puts nt_token
      new_notification = { **notification, :nt_token => nt_token }
      payload = { :mail => body, :notification => new_notification, :key => 3}
      dispatch_notification payload
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
      id = generate_member_id
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
      link = "https://ypn-base.herokuapp.com/reset/password/?tk=#{token}"
      body = { :destination => data.email, :subject => 'Reset Your Password', :link => link, :username => data[:username] }
      payload = { :notification => { :destination => data.username }, :key => 2, :mail => body }
      dispatch_notification payload
      return token
    end
    raise StandardError.new('Sorry, we couldnt find that user')
  end


  def send_confirm_email id
    data = self.model.find_by(id: id.to_i)
    if data
      payload = { :id => data.id }
      token = Auth.issue payload
      link = "https://ypn-base.herokuapp.com/confirm/mail/?tk=#{token}"
      body = { :destination => data.email, :subject => 'Welcome to Youth Party Nigeria', :link => link, :username => data[:username] }
      payload = { :key => 1, :mail => body, :notification => { :destination => data.username }}
      dispatch_notification payload
      return token
    end
    raise StandardError.new('Sorry, we couldnt find that user')
  end

  def generate_token body
    data = { id: body.id, role: body.role, username: body.username, lastname: body.lastname, email: body.email, firstname: body.firstname, nt_token: body.nt_token, meta: body.meta }
    data = Auth.issue data
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


def update_notification_token user, notification
  reference = Auth.decode user.nt_token
  reference = reference[0]
  reference["notifications"] << notification
  content = { :notifications => reference["notifications"] }
  n_token = Auth.issue content
  user.nt_token = n_token
  user.save!
  return n_token
end

def dispatch_notification body
  uri = URI.parse("https://ypn-notification-api.herokuapp.com/receive/")
  http = Net::HTTP.new(uri.host, uri.port);
  header = {'Content-Type': 'application/json'}
  request = Net::HTTP::Post.new(uri.request_uri, header)
  request.body = body.to_json
  http.request(request)
  return
  puts "Remember to change this when the mailer service starts"
end


end

# message = '<h3> Hello there this is an absolutely great time to sign up on booktu,
#             Here is a link to get things started <h3> '
# body = {:subject =>  "Welcome to booktu", :message => message }
# # mail_content(@user[:email], body)
