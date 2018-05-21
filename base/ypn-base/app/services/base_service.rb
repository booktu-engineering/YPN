class BaseService
  attr_accessor :model

  def initialize model
    self.model = model
  end

  def create body
    self.model.create!(body)
  end

  def fetch_all
    return self.model.all
  end

  def fetch_one key, value
    query = generate_query(key, value)
    data = self.model.find_by(query)
    return data
  end

  def delete_one? key, value
    query = generate_query(key, value)
    data = self.model.find_by(query)
    if data.present?
      data.destroy
      return true
    end
    false
  end

  def update_one key, value, changes
    query = generate_query(key, value)
    data = self.model.find_by(query)
    if data.present?
      data.update(changes)
      return data
    end
  end

  private
  def generate_query key, value
    if !key.instance_of?(String)
      e = StandardError.new('The input might be wrong somewhere')
      raise e
    end
    query = {}
    query["#{key}"] = value
    query
  end
end
