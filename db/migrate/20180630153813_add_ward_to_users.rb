class AddWardToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :ward, :string
    add_column :users, :avatar, :string
  end
end
