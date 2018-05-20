class User < ApplicationRecord
  # attr_reader :posts, :role
  # after_initialize :assign_role
  validates_presence_of :username, :email, :password, on: :create
  has_secure_password

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
  end

end
