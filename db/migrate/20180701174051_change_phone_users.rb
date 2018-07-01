class ChangePhoneUsers < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :phone, :string
    add_column :users, :state, :string
  end
end
