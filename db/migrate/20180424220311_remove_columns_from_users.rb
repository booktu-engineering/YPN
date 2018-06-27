class RemoveColumnsFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :email, :string
    remove_column :users, :password, :string
    add_column :users, :email, :string
    add_column :users, :password, :string
  end
end
