module UserFilter

  class LoggedInOnly
    def self.before controller
      if controller.request.headers['Authorization'].present?
        begin
        token = controller.request.headers["HTTP_AUTHORIZATION"]
        data = Auth.decode token
        user = data[0]
        if user && user['id'].present?
          controller.params[:current_user] = user
          controller.current_user = user
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
      if controller.request.headers['Authorization'].present?
        begin
        token = controller.request.headers["HTTP_AUTHORIZATION"]
        user = Auth.decode token
        if user && user.id.present? && user.role.present? && user.role > 4
          controller.params[:user] = user
        end
        return controller.unauthorized_user
        rescue StandardError => e
          return controller.deformed_process e
        end
      end
      return controller.bad_request
    end
  end

end
