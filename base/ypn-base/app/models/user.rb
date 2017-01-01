class User < ApplicationRecord
  # attr_reader :posts, :role
  # after_initialize :assign_role
  validates_presence_of :username, :email, :password, on: :create
  # validates :username, uniqueness: { message: 'Sorry the username is already taken'}, on: :create
  # validates :email, uniqueness: { message: 'Sorry the email is taken'}, :on => :create
  has_secure_password
  after_initialize :append_token
  after_initialize :assign_role

  def timeline
    arr = []
    self.friends.each do |friend|
      arr.push friend.posts
    end
    arr
  end


  def friends
  data = Relationship.where(follower_id: self.id)
  arr = []
  data.each do |relationship|
    arr.push(User.find_by(id: relationship.followed_id))
  end
  arr
  end



  def followers
    Relationship.where(followed_id: self.id)
    arr = []
    data.each do |relationship|
      arr.push(User.find_by(id: relationship.followed_id))
    end
  end


#make sure the defaut value of role is user, so that everyone begins the application being a user
  private
  def assign_role
    self.role ||= 0
    self.reset_password_count ||= 0
  end

  def append_token
    payload = []
    token = Auth.issue payload
    self.nt_token = token
  end

end
