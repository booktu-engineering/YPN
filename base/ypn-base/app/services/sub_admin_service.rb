class SubAdminService < BaseService

  #assigning subadmin should change the role of the user to 4
  def fetch_one id
    group = self.model.find_by(id: id.to_i)
    if group
      members = []
      group.members ||= []
       group.members.each do |item|
         puts item
        user = User.find_by(id: item.to_i)
        members << user
      end
      data = { group: group, members: members.compact}
      return data
    end
    raise StandardError.new('There is no group matching the criteria sent')
  end

  def create body
    group = self.model.create!(body)
    body[:members].each do |id|
      data = User.find_by(id: id.to_i)
      if data
        data.update({ :role => 4 })
      end
    end
    return group
  end



  def change body
    group = self.model.find_by(id: body[:id].to_i)
    if group && body[:type].present? && body[:user_id]
        group.members ||= []

      if body[:type] === 'add' && !group.members.include?(body[:user_id].to_s)
        group.members << body[:user_id]
        data = User.find_by(id: body[:user_id].to_i)
        if data
          data.update({ :role => 4 })
        end
        group.save!
        return group
      elsif body[:type] === 'remove'
        if group.members.include? body[:user_id].to_s
          group.members.delete body[:user_id].to_s
          data = User.find_by(id: body[:user_id].to_i)
          if data
            data.update({ :role => 1 })
          end
          return group
        end
      end
      return group
    end
      raise StandardError.new('Please check that you are sending the correct data to the server')
  end



  def change_rights body
    group = self.model.find_by(id: body[:id])
    if group && body[:type].present? && body[:right].present?
      group.rights ||= []
      if body[:type] === 'add' && !group.rights.include?(body[:right].to_s)
        group.rights << body[:right]
        group.save!
      elsif body[:type] === 'remove' && group.rights.include?(body[:right].to_s)
        group.rights.delete body[:right].to_s
      end
      return group
    end
    raise StandardError.new('Please check that you are sending the correct data to the server')
  end



end
