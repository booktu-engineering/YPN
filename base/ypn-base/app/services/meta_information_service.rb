class MetaInformationService < BaseService

  def run_for_office body
    meta = self.model.new({ :user_id => body[:id], :key => 1, :extra_info => body[:extra] })
    if meta.valid?
      meta.save!
      return meta
    end
    raise ArgumentError.new('Something went wrong trying to process the data')
  end



  def sponsor_party_member body
    meta = self.model.new({ :user_id => body[:id], :key => 2 })
    if meta.valid?
      meta.save!
      return meta
    end
    raise ArgumentError.new('Something went wrong trying to process the data')
  end



  def volunteer_for_ypn
    meta = self.model.new({ :user_id => body[:id], :key => 3 })
    if meta.valid?
      meta.save!
      return meta
    end
    raise ArgumentError.new('Something went wrong trying to process the data')
  end



  def confirm_meta value
    meta = self.model.find_by(id: value.to_i)
    if meta
      meta.update({ status: true })
      puts meta.inspect
       user = User.find_by(id: meta.user_id)
      if user
        user.roles << meta.key
        user.meta["#{meta.key}"] = meta.extra_info
        user.save!
        return user
      end
       raise StandardError.new('Sorry we could not find the user in subject')
    end
    raise StandardError.new('Sorry we couldnt process this request')
  end

  def apply_for_career body
    data = self.model.create!({ :user_id => body[:user_id], :key => body[:key], :extra_info => { :career_id => body[:career_key] }})
    return data
  end


end
