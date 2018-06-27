class CareerController < ApplicationController
  before_action UserFilter::PartyMemberOnly
  before_action UserFilter::AdminOnly, :only => [:create, :delete_one, :update_one]

  def initialize
    @service = CareerService.new(Career)
  end



  def create
    begin
    career = service.create(career_params)
    render json: {:data => career, status: 'ok'}, :status => 201
    rescue StandardError => e
      unproccessable_entity e
    end
  end



  def delete_one
    begin
      career = service.delete_one? 'id', params[:id].to_i
      if career
        render json: { :status => 'ok'}, :status => 204
        return
      end
      raise StandardError.new('That didnt go through successfully')
    rescue StandardError => e
      unproccessable_entity e
    end
  end



  def update
    begin
      career = service.update_one 'id', params[:id], career_params
      render json: { :status => 'ok', :data => career }, :status => 201
    rescue StandardError => e
      unproccessable_entity e
    end
  end



  def all
    data = service.fetch_all
    render json: { :data => data }, :status => 200
  end


  def fetch_one
    data = service.fetch_one(params[:id].to_i)
    render json: { :data => data }, status: 200
  end


  def apply
    begin
    params[:user_id] = current_user['id'].to_i
    data = service.apply params
    render json: { :data => data }, :status => 200
    rescue StandardError => e
    unproccessable_entity e
    end
  end

private
  def career_params
    params.require(:career).permit(:role, :key, :name, :origin)
  end

end
