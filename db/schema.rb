# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180522120559) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "careers", force: :cascade do |t|
    t.string "name"
    t.integer "key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "origin"
    t.text "role"
  end

  create_table "meta_information_tables", force: :cascade do |t|
    t.integer "user_id"
    t.boolean "status"
    t.integer "key"
  end

  create_table "meta_informations", force: :cascade do |t|
    t.integer "user_id"
    t.boolean "status"
    t.integer "key"
    t.jsonb "extra_info"
  end

  create_table "posts", force: :cascade do |t|
    t.string "media"
    t.text "body"
    t.string "title"
    t.bigint "user_id"
    t.string "type", array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "relationships", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followed_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "friend_id"
  end

  create_table "rights", force: :cascade do |t|
    t.string "name"
    t.integer "key"
  end

  create_table "sub_admin_group_tables", force: :cascade do |t|
    t.text "members", array: true
    t.string "name"
  end

  create_table "sub_admin_groups", force: :cascade do |t|
    t.string "name"
    t.text "rights", array: true
    t.text "members", array: true
  end

  create_table "users", force: :cascade do |t|
    t.string "firstname"
    t.string "lastname"
    t.string "dob"
    t.string "roles", array: true
    t.jsonb "meta"
    t.integer "phone"
    t.string "lga"
    t.string "username"
    t.string "email"
    t.string "password"
    t.string "password_digest"
    t.integer "role"
    t.string "membership_number"
    t.string "nt_token"
    t.integer "reset_password_count"
    t.boolean "confirmed_email", default: false
  end

  add_foreign_key "posts", "users"
end
