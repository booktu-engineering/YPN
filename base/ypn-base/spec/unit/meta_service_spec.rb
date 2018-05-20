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

    it 'Admin confirming meta position should push it to the user' do
      meta = MetaInformation.last
      user = meta_service.confirm_meta meta.id
      expect(user[:roles]).to include(meta.key)
    end

end
