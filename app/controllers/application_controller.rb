require 'net/http'
require 'json'

class ApplicationController < ActionController::API
  before_action  UserFilter::LoggedInOnly
  attr_accessor :current_user, :service


  # errors and all of that
  def unproccessable_entity e
    puts e
    e.message ||= 'Something went wrong trying to process this request'
    render json: { errors: e.message }, status: 422
  end

  def resource_not_found
    render json: {data: nil }, status: 404
  end

  def request_forbidden e
    e.message ||= 'Sorry, you do not have permissions to do this'
    render json: { errors: e.message }, status: 403
  end

  def conflict e
    render json: { errors: e.full_messages }, status: 409
  end

  def deformed_process e
    e.message ||= 'Sorry, something went wrong trying to grant you access'
    render json: { errors: e.message }, status: 400
  end


  def mail_content destination, body, key
    puts body
    uri=URI.parse("http://localhost:3500/sendmail/?key=#{key}")
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

  def dispatch_notification body
    uri = URI.parse("http://52.47.48.167/notifications/receive/")
    http = Net::HTTP.new(uri.host, uri.port);
    header = {'Content-Type': 'application/json'}
    request = Net::HTTP::Post.new(uri.request_uri, header)
    request.body = body.to_json
    http.request(request)
    return
  end

end
