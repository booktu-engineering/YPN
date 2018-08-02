class AddBioVinToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :vin, :string
    add_column :users, :bio, :text
  end
end
