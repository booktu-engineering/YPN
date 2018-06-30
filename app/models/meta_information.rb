class MetaInformation < ApplicationRecord
  after_initialize :append_status
private
  def append_status
    self.status ||= false
  end
end
