class RemoveUsernameColumnFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :username, :string
    add_column :users, :username, :string, index: true 
  end
end
