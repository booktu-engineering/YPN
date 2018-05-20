require 'rails_helper'

describe 'Career service object' do
  let(:career_service) { CareerService.new(Career)}

    it 'Create method should successfully create a career for the user' do
    mock_career = { :name => 'This is a test Career', :key => 10 }
    data = career_service.create(mock_career)
    expect(data.name).to eq('This is a test Career')
    end

    it 'Apply method should successfully apply a user for a post' do
      career = Career.first
      user = User.last
      body = { :user_id => user.id, :career_id =>  career.id, :key => career.key }
      meta = career_service.apply body
      expect(meta.extra_info).not_to be_nil
    end

    it 'Fetch one should return the applicants of a career' do
      data = Career.first
      res = career_service.fetch_one data.id
      expect(res[:applicants]).not_to be_nil
    end
end
