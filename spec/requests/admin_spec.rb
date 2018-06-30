require 'rails_helper'

describe 'Admin API endpoints', :type => :request do
  before(:all) do
    admin = create(:admin)
    @payload = { :id => admin.id, :role => admin.role }
  end
  let(:token) { Auth.issue @payload}
  let(:headers) { { 'Authorization' => token } }
  let(:user){ create(:user)}
  let(:group){ SubAdminGroup.last }

  it 'Should reject the request if not admin' do
    fake_admin = create(:fake_admin)
    payload = { :id => fake_admin.id, :role => fake_admin.role }
    access = Auth.issue payload
    auth = { 'Authorization' => access }
    get '/users', :headers => auth
    expect(response).to have_http_status(403)
  end

  it'Should fetch all the users in the db' do
    get '/users', :headers => headers
    expect(response).to have_http_status(200)
    body = JSON.parse(response.body)
    expect(body['data']).not_to be_nil
  end

  it 'Put /role Should change the role of a user from nil to 4' do

    put "/role/#{user.id}/4", :headers => headers
    expect(response).to have_http_status(200)
    body = JSON.parse(response.body)
    expect(body['data']['role']).to eq(4)
    expect(body['status']).to eq('ok')
  end

  it 'Admin should be able to create a subadmin' do
    post '/subadmin', :params => { :group => { name: 'A test subadmin group', members: [ 10, 11, 12 ] } }, :headers => headers
    expect(response).to have_http_status(201)
    body = JSON.parse(response.body)
    expect(body['data']['name']).to eq('A test subadmin group')
  end

  it 'Get the members in the subadmin group' do
    get "/group/#{group.id}", :headers => headers
    body = JSON.parse(response.body)
    expect(response).to have_http_status(200)
    expect(body['data']['members']).not_to be_nil
  end

  it 'Change member should add a member' do
    put '/change/group/add', :params => { :id => group.id, :user_id => user.id }, :headers => headers
    body = JSON.parse(response.body)
    expect(response).to have_http_status(200)
    expect(body['data']['members']).to include("#{user.id}")
  end

  it 'Change the member should add a member' do
    put '/change/group/remove', :params => { :id => group.id, :user_id => user.id}, :headers => headers
    expect(response).to have_http_status(200)
    body = JSON.parse(response.body)
    expect(body['data']['members']).not_to include("#{user.id}")
  end

  it 'Change should add a right to a particular group' do
    put '/rights/group/add', :params => { :id => group.id, :right => 50 }, :headers => headers
    expect(response).to have_http_status(200)
    body = JSON.parse(response.body)
    expect(body['data']['rights']).to include('50')
  end

end
