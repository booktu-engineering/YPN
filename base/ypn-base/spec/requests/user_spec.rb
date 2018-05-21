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


    it 'Show should reject request without token' do
      get '/profile/1'
      expect(response).to have_http_status(403)
      expect(response.body['errors']).not_to be_nil
    end

    it 'SHOW - Should fetch a user with the token present' do
      headers = { "Authorization" => token }
      get '/profile/210', :headers => headers
      body = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(body['data']).not_to be_nil
    end

    it 'Follow should create a relationship between the current user and the target' do
        headers = { "Authorization" => token }
        post '/follow/232', :headers => headers
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

  end

end
