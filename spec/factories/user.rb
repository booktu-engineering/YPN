
FactoryBot.define do
  factory :user do
    username Faker::Name.name
    email Faker::Internet.email
    password Faker::Internet.password
    role 1
  end

  factory :base, :class => 'User' do
    username Faker::Name.name
    email Faker::Internet.email
    password Faker::Internet.password
    role 0
  end

  factory :admin, :class => 'User' do
    username Faker::Name.name
    email Faker::Internet.email
    password Faker::Internet.password
    role 5
  end

  factory :fake_admin, :class => 'User' do
    username Faker::Name.name
    email Faker::Internet.email
    password Faker::Internet.password
    role 2
  end


end
