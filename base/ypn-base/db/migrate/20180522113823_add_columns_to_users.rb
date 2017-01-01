class AddColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :reset_password_count, :integer
    add_column :users, :confirmed_email, :boolean, :default => true 
  end
end
