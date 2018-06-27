class AddColumnToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :membership_number, :string
    add_column :users, :nt_token, :string
  end
end
