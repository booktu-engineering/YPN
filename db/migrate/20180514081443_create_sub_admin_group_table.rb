class CreateSubAdminGroupTable < ActiveRecord::Migration[5.1]
  def change
    create_table :sub_admin_group_tables do |t|
      t.text :members, array: true
      t.string :name, trim: true
    end
  end
end
