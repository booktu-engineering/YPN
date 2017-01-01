require 'rails_helper'

describe 'Career Endpoints', :type => :request do
  before(:all) do
    admin = create(:admin)
    @payload = { :id => admin.id, :role => admin.role }
  end
  let(:token) { Auth.issue @payload}
  let(:headers) { { 'Authorization' => token } }

  it 'POST /career should create a career' do
    career = { :origin => 'INEC', :role => 'Personal assistant', :key => 10 }
    post '/careers', :params => { :career => career }, :headers => headers
    expect(response).to have_http_status(201)
    body = JSON.parse(response.body)
    expect(body['data']['role']).to eq('Personal assistant')
    expect(body['data']['key']).to eq(10)
    expect(body['data']['origin']).to eq('INEC')
  end

  it 'Put /career should change the contents of a career' do
    career = Career.last
    put "/careers/#{career.id}", :params => { :career => { :origin => 'Itasoha Party' }}, :headers => headers
    expect(response).to have_http_status(201)
    body = JSON.parse(response.body)
    expect(body['data']['origin']).to eq('Itasoha Party')
    expect(body['status']).to eq('ok')
  end

  it 'Fetch all should get all the careers available in the db' do
    get '/careers', :headers => headers
    body = JSON.parse(response.body)
    expect(response).to have_http_status(200)
    expect(body['data']).to be_an_instance_of(Array)
  end

  it 'POST /careers/apply/:id should allow the current user apply for a post' do
    career = Career.last
    user = create(:fake_admin)
    payload = { :id => user.id, :role => user.role }
    new_token = Auth.issue payload
    post "/careers/apply/#{career.id}", :headers => { :Authorization => new_token }
    expect(response).to have_http_status(200)
    body = JSON.parse(response.body)
    expect(body['data']).not_to be_nil
    expect(body['data']['extra_info']['career']['origin']).to eq('Itasoha Party')
  end

  it 'Confirm meta should let the admin confirm the application' do
    meta = MetaInformation.last
    put "/approve/#{meta.id}", :headers => headers
    body = JSON.parse(response.body)
    expect(response).to have_http_status(200)
    expect(body['data']['roles']).to include(meta.key.to_s)
    expect(body['data']['meta']["#{meta.key}"]).not_to be_nil
  end

  it 'Fetch one should fetch the career and the applicants' do
    career = Career.last
    get "/careers/#{career.id}", :headers => headers
    expect(response).to have_http_status(200)
    body = JSON.parse(response.body)
    expect(body['data']['applicants']).to be_an_instance_of(Array)
    expect(body['data']['applicants'][0]['roles']).not_to be_nil
  end

end
