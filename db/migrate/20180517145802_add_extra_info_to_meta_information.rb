class AddExtraInfoToMetaInformation < ActiveRecord::Migration[5.1]
  def change
    add_column :meta_informations, :extra_info, :jsonb
  end
end
