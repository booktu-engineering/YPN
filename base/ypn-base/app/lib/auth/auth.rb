require 'jwt'

class Auth
  HMAC_SECRET = Rails.application.secrets.secret_key_base
  ALGORITHM = 'HS256'

  def self.issue payload
    JWT.encode payload, HMAC_SECRET, ALGORITHM  
  end

  def self.decode token
      JWT.decode token, HMAC_SECRET, true, { algorithm: ALGORITHM }
  end

end
