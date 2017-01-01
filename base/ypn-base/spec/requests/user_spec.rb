require 'rails_helper'

RSpec.describe 'Users Api', type: :request do

  describe 'Sign Up Endpoints' do
    context 'when there is a valid data' do
      let(:valid_params){ {username: 'hasstrup', email: 'hasstrup.ezekiel@gmailx.com', password: 'thisisatestpassword', firstname: 'Hasstrup' }}
      it 'should return a valid entry with status' do
        post '/signup', :params => { :user => valid_params }
        body = JSON.parse(response.body)
        expect(body['data']['user']['username']).to eq('hasstrup')
        expect(response).to have_http_status(201)
      end
    end

    context 'When the data is invalid with empty or bad data' do
      it 'should return response of 422 with bad data' do
        post '/signup', :params => { :user => { username: '', email: '', password: '', firstname: '' }}
        body = JSON.parse(response.body)
        expect(body['errors']).not_to be_nil
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'Log In endpoints' do
    it 'Should successfully log in a user' do
      post '/login', :params => { :user => { email: 'hasstrup.ezekiel@gmailx.com', password: 'thisisatestpassword' }}
      body = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(body['data']['user']['username']).to eq('hasstrup')
    end

    it 'Should deny access with invalid params' do
      post '/login', :params => { :user => { email: 'hasstrup.ezekiel@gmailx.com', password: '1234' }}
      expect(response).to have_http_status(403)
      expect(response.body['errors']).not_to be_nil
    end
  end

  describe 'Tokenized endpoints' do
    before(:all) do
      user = User.last
      @payload = { :id => user.id, :role => user.role }
    end
    let(:token) { Auth.issue @payload}
    let(:user) { create(:user)}


    it 'Show should reject request without token' do
      get '/profile/1'
      expect(response).to have_http_status(403)
      expect(response.body['errors']).not_to be_nil
    end

    it 'SHOW - Should fetch a user with the token present' do
      headers = { "Authorization" => token }
      get "/profile/#{user.id}", :headers => headers
      body = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(body['data']).not_to be_nil
    end

    it 'Follow should create a relationship between the current user and the target' do
        headers = { "Authorization" => token }
        post "/follow/#{user.id}", :headers => headers
        body = JSON.parse(response.body)
        expect(response).to have_http_status(201);
        expect(body['status']).to eq('ok')
        expect(body['data']).not_to be_nil
    end


    it 'Update Profile should only work for the owner of the account' do
      headers = { "Authorization" => token }
      put '/user', :params => {:user => {:lastname => 'Ezekiel'}}, :headers => headers
      body = JSON.parse(response.body);
      expect(body['data']['lastname']).to eq('Ezekiel');
    end

    it 'Delete Profile should delete a user from the platform' do
      headers = { "Authorization" => token }
      delete '/user', :headers => headers
      expect(response).to have_http_status(204)
    end

    it 'POST /fetch should fetch a user from the db' do
      post '/fetch', :params => { :user => { :username => User.last.username }}
      body = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(body['data']).not_to be_nil
      expect(body['data']['username']).to eq(User.last.username)
    end

    it 'POST /send/reset/password should send a reset password link to the user' do
      post '/send/reset/password', :params => { :id => User.last.id }
      body = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(body['data']).to be_an_instance_of(String)
      expect(body['status']).to eq('ok')
      TOKEN = body['data']
    end

    it 'Get /reset/password/?tk=token should update the reset password count of a user' do
      get "/reset/password/?tk=#{TOKEN}"
      body = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(body['data']['reset_password_count']).to be > 0
      expect(body['status']).to eq('ok')
    end

    it 'Get /reset/password/?tk=token should fail, if the token is used again' do
      get "/reset/password/?tk=#{TOKEN}"
      expect(response).to have_http_status(422)
    end

    it 'Get /confirm/mail/ should confirm the mail of a user successfully if used once' do
      users = User.all
      user = users[users.length - 3]
      payload = { id: user.id }
      MAIL_TOKEN = Auth.issue payload
      get "/confirm/mail/?tk=#{MAIL_TOKEN}"
      expect(response).to have_http_status(200)
    end

    it 'Get /confirm/mail/ should fail if used more than once' do
      get "/confirm/mail/?tk=#{MAIL_TOKEN}"
      expect(response).to have_http_status(422)
    end


  end


end
