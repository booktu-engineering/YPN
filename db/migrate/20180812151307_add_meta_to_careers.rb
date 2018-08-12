class AddMetaToCareers < ActiveRecord::Migration[5.1]
  def change
    add_column :careers, :meta, :jsonb
  end
end
