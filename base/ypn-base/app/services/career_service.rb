class CareerService < BaseService
  def fetch_one id
    career = self.model.find_by(id: id)
    if career
      applicants = career.applicants
      return { :career => career, :applicants => applicants }
    end
    raise StandardError.new('There is no such career on the platform')
  end

  def apply body
    career = self.model.find_by(id: body[:career_id])
    if career
    data = MetaInformation.create!({ :user_id => body[:user_id], :key => body[:key], :extra_info => { :career => career }})
    return data
    end
  end

end
