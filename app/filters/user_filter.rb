module UserFilter

  class LoggedInOnly
    def self.before(controller)
      if controller.request.headers['Authorization'].present?
        begin
        token = controller.request.headers["HTTP_AUTHORIZATION"]
        data = Auth.decode token
        user = data[0]
        if user && user['id'].present?
          controller.params[:current_user] = user
          controller.current_user = User.find(user['id'])
          return
        end
        return controller.unauthorized_user
        rescue StandardError => e
          return controller.deformed_process e
        end
      end
      e = StandardError.new('You need to have a token to do this')
      return controller.request_forbidden e
    end
  end


  class AdminOnly
    def self.before controller
      if controller.current_user && controller.current_user['role'] > 3
        return
      end
      e = StandardError.new('Only admin members are allowed to do this')
      return controller.request_forbidden e
    end
  end

  class PartyMemberOnly
    def self.before controller
      if controller.current_user && controller.current_user['role'] > 0
      return
      end
    e = StandardError.new('You need to be a party member to do this')
    return controller.request_forbidden e
    end
  end

end
