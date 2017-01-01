require 'rails_helper'

describe 'Sub Admin management unit tests' do
   let (:sub_admin_service) { SubAdminService.new(SubAdminGroup)}

   it 'Create one should create a submin group' do
     body = { :name => 'Hasstrup Ezekiels Sub admin group', :rights => [1,4,5,6], :members => [ 69, 70, 102]}
     data = sub_admin_service.create body
     expect(data.name).to eq(body[:name])
   end

   it 'Fetch one should get the members of the subadmin group' do
     sub_admin_group = SubAdminGroup.last
     data = sub_admin_service.fetch_one sub_admin_group.id
     expect(data[:members]).not_to be_nil
   end

   it 'Add or remove remove member should add a member to a subadmin group' do
     sub_admin_group = SubAdminGroup.last
     body = { :id => sub_admin_group.id, :type => 'add', :user_id => 71}
     data = sub_admin_service.change body
     expect(data.members).to include('71')
   end

   it 'Add or remove members should delete a user from the group' do
     sub_admin_group = SubAdminGroup.last
     body = { :id => sub_admin_group.id, :type => 'remove', :user_id => 71}
     data = sub_admin_service.change body
     expect(data.members).not_to include('71')
   end


  it 'Add or remove rights should add a right to the subgroup' do
      sub_admin_group = SubAdminGroup.last
      body = { :id => sub_admin_group.id, :type => 'add', :right => 34}
      data = sub_admin_service.change_rights body
      expect(data.rights).to include('34')
    end

  it 'Add or remove remove a right from the subgroup' do
    sub_admin_group = SubAdminGroup.last
    body = { :id => sub_admin_group.id, :type => 'remove', :right => 34}
    data = sub_admin_service.change_rights body
    expect(data.rights).not_to include('34')
  end

end
