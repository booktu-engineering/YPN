class CreateMetaInformationTable < ActiveRecord::Migration[5.1]
  def change
    create_table :meta_information_tables do |t|
      t.integer :user_id
      t.boolean :status
      t.integer :key 
    end
  end
end
