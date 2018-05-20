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
      user_two_id = User.first.id
      body = { :follower_id => user_one_id, :followed_id =>  user_two_id }
      data = user_service.follow(body)
      expect(data[:data][:follower_id]).not_to be_nil
      expect(data[:data][:followed_id]).not_to be_nil
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
      body = [ 69, 70, 71, 72]
      data = user_service.fetch_users body
      expect(data.length).to eq(4)
    end
  end


end
