class AdminController < ApplicationController
  attr_accessor :service
  before_action UserFilter::AdminOnly
  skip_before_action UserFilter::AdminOnly, only: [:all]

  def initialize
    @service = SubAdminService.new(SubAdminGroup)
    @user_service = UserService.new(User)
  end


  def all
    data = @user_service.fetch_all
    render json: { :data => data }, status: 200
  end


  def change_role
    begin
      data = @user_service.change_role(params)
      render json: { :data => data, :status => 'ok'}, status: 200
    rescue StandardError => e
      puts e.message
      resource_not_found
    end
  end


  def new_group
    begin
      group = service.create sub_admin_params
      render json: { :data => group, status: 'ok'}, status: 201
    rescue StandardError => e
      unproccessable_entity e
    end
  end


  def fetch_group
    begin
      group = service.fetch_one params[:id].to_i
      render json: { :data => group, :status => 'ok' }, status: 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end


  def change
    begin
      group = service.change params
      render json: { :data => group, :status => 'ok'}, status: 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end


  def change_rights
    begin
      group = service.change_rights params
      render json: { :data => group, :status => 'ok'}, status: 200
    rescue StandardError => e
      unproccessable_entity e
    end
  end



  private
  def sub_admin_params
    params.require(:group).permit(:name, :members => [], :rights => [])
  end

end
