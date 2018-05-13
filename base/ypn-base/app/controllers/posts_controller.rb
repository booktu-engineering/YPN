class PostsController < ApplicationController

  def create
    begin
    @user = User.find_by id: params[:user_id];
    @post = Post.create!(post_params)
    puts @post.body
    render json: { :post => @post}, status: 201
  rescue e
    render json: {:error => e.message}, status: 422
    end
  end


  private
    def post_params
      params.permit(:body, :title, :media, :type, :lga, :phone, :email, :user_id)
    end

end
