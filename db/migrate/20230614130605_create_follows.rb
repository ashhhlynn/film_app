class CreateFollows < ActiveRecord::Migration[6.1]
  def change
    create_table :follows do |t|
      t.string :user_id
      t.string :following_id
      t.timestamps
    end
  end
end
