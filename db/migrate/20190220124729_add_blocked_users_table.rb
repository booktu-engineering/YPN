class AddBlockedUsersTable < ActiveRecord::Migration[5.1]
  def change
    create_table :blocking_relationships do |t|
      t.integer :blocked_user_id
      t.integer :blocking_user_id
    end 
  end
end
