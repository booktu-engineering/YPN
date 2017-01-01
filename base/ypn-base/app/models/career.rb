class Career < ApplicationRecord
  attr_reader :applicants

  def applicants
    keys = [10, 11, 12, 13]
    data = MetaInformation.all.select do |item|
            keys.include? (item.key)
          end
    puts self.id
    meta = data.select do |item|
        item.extra_info['career']['id'] === self.id
        end
    meta = meta.collect do |item|
      return User.where(id: item.user_id.to_i)
    end
    return meta
  end
end
