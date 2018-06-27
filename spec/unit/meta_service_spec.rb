require 'rails_helper'

RSpec.describe 'Meta Information Service Object' do
  let(:meta_service) { MetaInformationService.new(MetaInformation) }
  let(:user) { create(:user) }

  it 'Run for office should run for the office' do
    user_id = User.take.id
    body = { :id => user_id, :extra => { type: 'Local', state: 'Edo State' } }
    meta = meta_service.run_for_office body
    expect(meta[:key]).to eq(1)
  end

  it 'Sponsor Party Member should sponsor a party member' do
    body = { :id => user.id, :extra => { type: 'Local', state: 'Edo State' } }
    meta = meta_service.sponsor_party_member body
    expect(meta[:key]).to eq(2)
  end

  it 'Volunteering Members should allow a user volunteer' do
    body = { :id => user.id, :extra => { type: 'Local', state: 'Edo State' } }
    meta = meta_service.volunteer_for_ypn body
    expect(meta[:key]).to eq(3)
  end

  it 'Admin confirming meta position should push it to the user' do
    meta = MetaInformation.last
    user = meta_service.approve meta.id
    expect(user[:roles]).to include(meta.key.to_s)
  end

  it 'Fetch should fetch all the party members in a meta position' do
    meta = MetaInformation.last
    users = meta_service.fetch meta.key
    expect(users).to be_an_instance_of(Array)
    expect(users.length).to be > 0
    expect(users[0]['roles']).to include("#{meta.key}")
  end
end
