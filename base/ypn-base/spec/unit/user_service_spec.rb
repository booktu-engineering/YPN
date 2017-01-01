require 'rails_helper'

RSpec.describe 'User service object', type: :unit do
  let (:user_service) { UserService.new(User)}

  describe 'Auth methods' do

    it 'sign up should return a valid sign up method' do
      begin
      user1 = { :username => "Hasstrupezekiel", :password => '12346', :email => 'Onosetale32@gmail.com'}
      data = user_service.signup(user1)
      expect(data[:user][:username]).to eq("Hasstrupezekiel")
      expect(data[:user][:email]).to eq("Onosetale32@gmail.com")
    rescue StandardError => e
      expect(e).to be_nil
      end
    end


    it 'Log in method should sign in a valid user' do
      begin
        data = user_service.login({ email: "Onosetale32@gmail.com", password: "12346" })
        expect(data[:token]).not_to be_nil
        expect(data[:user][:username]).to eq("Hasstrupezekiel")
      rescue StandardError => e
        expect(e).to be_nil
      end
    end
  end


  describe 'Follow methods' do
    it 'Follow methods should create a relationship between users' do
      user_one_id = User.last.id
      user_two_id = User.first
      body = { :id => user_one_id, :current_user =>  user_two_id }
      data = user_service.follow(body)
      expect(data[:follower_id]).not_to be_nil
      expect(data[:followed_id]).not_to be_nil
    end
  end

  describe 'Find and change role methods' do

    it 'Should find a particular user' do
      @user_one = User.last.id
      data = user_service.fetch_one('id', @user_one)
      expect(data).not_to be_nil
      expect(data[:username]).not_to be_nil
    end


    it 'Should change the role of the party member to a party member' do
      user_one = User.last.id
      body = { :id => user_one, :role => 2}
      data = user_service.change_role(body)
      expect(data[:role]).to eq(2)
    end


    it 'Should find a bunch of a users when sent an array of user ids' do
      users = User.all
      body = [ users[0].id, users[1].id, users[2].id, users[3].id  ]
      data = user_service.fetch_users body
      expect(data.length).to eq(4)
    end


    it 'Generate membership number should change the membership number of the base_user' do
      user = create(:base)
      body = { :id => user.id }
      data = user_service.new_party_member body
      expect(data.membership_number).not_to be_nil
    end


    it 'Send confirm email should generate a token that is sent to the user' do
      user = User.last
      token = user_service.send_confirm_email user.id
      payload = Auth.decode token
      @payload = payload[0]
      expect(@payload['id']).to eq(user.id)
    end


    it 'Confirm email logic should change the status of the user to true' do
      payload = { id: User.last.id }
      token = Auth.issue payload
      data = user_service.confirm_email token
      expect(data).not_to be_nil
      expect(data.confirmed_email).to be(true)
    end


    it 'Confirm email logic should throw error with a used token' do
      payload = { id: User.last.id }
      token = Auth.issue payload
       expect { user_service.confirm_email token }.to raise_error(StandardError)
    end


    it 'Send Reset Password should send the password reset link to the user' do
      user = User.last
      token = user_service.send_confirm_email user.id
      payload = Auth.decode token
      @payload = payload[0]
      expect(@payload['id']).to eq(user.id)
    end


    it 'Reset Password should update the reset password' do
      payload = { id: User.last.id, reset_password_count: User.last.reset_password_count }
      token = Auth.issue payload
      data = user_service.reset_password token
      expect(data).not_to be_nil
      expect(data.reset_password_count).to be > 0
    end


    it 'Reset Password logic should throw error with a used token' do
      payload = { id: User.last.id }
      token = Auth.issue payload
       expect { user_service.reset_password token }.to raise_error(StandardError)
    end


    it 'Fetch should return the details specified' do
      query = { username: User.last.username }
      data = user_service.fetch query
      expect(data.username).to eq(User.last.username)
      expect(data.id).to eq(User.last.id)
    end

  end
end
