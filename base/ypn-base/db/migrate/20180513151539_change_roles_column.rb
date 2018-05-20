class ChangeRolesColumn < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :meta, :jsonb, using: 'meta::text::jsonb'
  end
end
