require 'rails_helper'

RSpec.describe User, type: :model do
  it{ should respond_to(:email)}
  it{ should respond_to(:phone)}
  it{ should respond_to(:lga)}
  # Validations
  it { should validate_presence_of(:username)}
  it { should validate_presence_of(:email)}
  it { should validate_presence_of(:password)}

end
