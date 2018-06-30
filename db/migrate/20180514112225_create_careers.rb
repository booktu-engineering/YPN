class CreateCareers < ActiveRecord::Migration[5.1]
  def change
    create_table :careers do |t|
      t.string :name
      t.integer :key

      t.timestamps
    end
  end
end
