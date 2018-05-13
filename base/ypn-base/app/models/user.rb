class User < ApplicationRecord
  attr_reader :posts
  validates_presence_of :username, :email, :password
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

end
