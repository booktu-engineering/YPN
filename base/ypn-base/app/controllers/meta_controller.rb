class MetaController < ApplicationController
  before_action :align_params
  skip_before_action :align_params, :only => [:confirm]
  before_action UserFilter::PartyMemberOnly

  def initialize
    @service = MetaInformationService.new(MetaInformation)
  end


  def run_for_office
    begin
      meta = service.run_for_office params
      render json: { :data => meta }, :status => 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end


  def volunteer
    begin
      meta = service.sponsor_party_member params
      render json: { :data => meta }, :status => 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end


  def sponsor
    begin
      meta = service.volunteer_for_ypn params
      render json: { :data => meta }, :status => 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end


  def confirm
    begin
      data = service.approve params[:id]
      render json: {:data => data}, :status => 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end


  def fetch
    begin
      data = service.fetch params[:key]
      render json: { :data => data }, :status => 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end

  private

  def align_params
    params[:id] = current_user['id'].to_i
  end

end
