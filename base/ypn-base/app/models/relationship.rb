class Relationship < ApplicationRecord
  belongs_to :friend, class_name: 'User'
  belongs_to :follower,  class_name: 'User', foreign_key: 'follower_id'
end
