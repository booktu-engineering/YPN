class CreateUsersTable < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :password, null: false
      t.string :firstname
      t.string :lastname
      t.string :dob
      t.string :roles, array: true
      t.string :meta, jsonb: true
    end
  end
end
