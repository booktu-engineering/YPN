class AddFriendIdToRelationship < ActiveRecord::Migration[5.1]
  def change
    add_column :relationships, :friend_id, :integer
  end
end
