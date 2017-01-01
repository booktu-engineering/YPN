class CareerService < BaseService
  def fetch_one id
    career = self.model.find_by(id: id)
    if career
      applicants = career.applicants
      puts applicants
      return { :career => career, :applicants => applicants }
    end
    raise StandardError.new('There is no such career on the platform')
  end

  def apply body
    career = self.model.find_by(id: body[:id])
    if career
    data = MetaInformation.create!({ :user_id => body[:user_id], :key => career.key, :extra_info => { :career => career }})
    return data
    end
    raise StandardError.new('Sorry we couldnt find any career like that')
  end

end
