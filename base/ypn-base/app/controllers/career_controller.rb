class CareerController < ApplicationController
  CAREER_SERVICE_OBJECT = CareerService.new(Career)
  def create
  end

  # The catch here is to find all the users who have applied to this career
  def fetch_one
    @data = CAREER_SERVICE_OBJECT.fetch_one(params[:name])
    render json: { :data => data }, status: 200
  end
end
