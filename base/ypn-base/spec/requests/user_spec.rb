# require 'rails_helper'
#
# RSpec.describe 'Users Api', type: :request do
#
#   describe 'Fake Sign Up' do
#
#     context 'when there is a valid data' do
#       let(:valid_params){ {username: 'hasstrup', email: 'hasstrup.ezekiel@gmail.com', password: 'thisisatestpassword', firstname: 'Hasstrup' }}
#       before { post '/signup', params: valid_params }
#
#       it 'should return a valid entry with status' do
#         body = JSON.parse(response.body)
#         puts body
#       expect(body[:username]).to eq('hasstrup')
#       expect(response).to have_http_status(201)
#       end
#
#     end
#
#   end
#
# end
