require 'rails_helper'

describe 'Meta Services', :type => :request do
  before(:all) do
    admin = create(:fake_admin)
    @payload = { :id => admin.id, :role => admin.role }
  end
  let(:token) { Auth.issue @payload}
  let(:headers) { { 'Authorization' => token } }

  it 'Run For Office should let a party member run for office' do
    post '/apply/office', :params => { :extra => { :type => 'Local', :state => 'Edo state' }}, :headers => headers
    expect(response).to have_http_status(200)
    body = JSON.parse(response.body)
    expect(body['data']['key']).to eq(1)
    expect(body['data']['extra_info']).not_to be_nil
  end

  it 'Volunteer should let a party member/user volunteer for a post' do
    post '/apply/volunteer', :params => { :extra => { :type => 'Local', :state => 'Edo state' }}, :headers => headers
    expect(response).to have_http_status(200)
    body = JSON.parse(response.body)
    expect(body['data']['key']).to eq(2)
    expect(body['data']['extra_info']).not_to be_nil
  end

  it 'Sponsor a party member should let a party member/user become sponsored' do
    post '/apply/sponsor', :params => { :extra => { :type => 'Local', :state => 'Edo state' }}, :headers => headers
    expect(response).to have_http_status(200)
    body = JSON.parse(response.body)
    expect(body['data']['key']).to eq(3)
    expect(body['data']['extra_info']).not_to be_nil
  end

  it 'Confirm should confirm an application' do
    meta = MetaInformation.last
    put "/approve/#{meta.id}", :headers => headers
    expect(response).to have_http_status(200)
  end

  it 'Should fetch all the party members belonging to a specific key' do
    meta = MetaInformation.last
    get "/application/#{meta.key}", :headers => headers
    body = JSON.parse(response.body)
    expect(body['data']).to be_an_instance_of(Array)
    expect(body['data'][0]['roles']).to include("#{meta.key}")
  end


end
