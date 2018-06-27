class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :media
      t.text :body
      t.string :title
      t.references :user, foreign_key: true
      t.string :type, array: true

      t.timestamps
    end
  end
end
