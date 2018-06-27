class CreateSubAdminGroup < ActiveRecord::Migration[5.1]
  def change
    create_table :sub_admin_groups do |t|
      t.string :name
      t.text :rights, array: true
      t.text :members, array: true
    end

    create_table :rights do |t|
      t.string :name
      t.integer :key
    end
  end
end
