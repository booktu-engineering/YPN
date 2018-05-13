require 'net/http'
require 'json'

class ApplicationController < ActionController::API
  def unproccessable_entity
    render json: { errors: @user.errors }, status: 422
  end

  def resource_not_found
    render json: {user: null}, status: 404
  end

  def mail_content destination, body
    puts body
    uri=URI.parse('http://localhost:3500/sendmail')
    http = Net::HTTP.new(uri.host, uri.port);
    header = {'Content-Type': 'application/json'}
    request = Net::HTTP::Post.new(uri.request_uri, header)
    request.body = {
      destination: destination,
      subject: body[:subject],
      message: body[:message]
    }.to_json
     http.request(request);
     puts "successfully mailed the destination"
     return;
  end

end
