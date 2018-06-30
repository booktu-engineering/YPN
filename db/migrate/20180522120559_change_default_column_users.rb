class ChangeDefaultColumnUsers < ActiveRecord::Migration[5.1]
  def change
    change_column_default :users, :confirmed_email, from: true, to: false
  end
end
