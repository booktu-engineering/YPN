class AddColumnstoCareers < ActiveRecord::Migration[5.1]
  def change
    add_column :careers, :origin, :text
    add_column :careers, :role, :text
  end
end
