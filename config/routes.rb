Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/rails' do
  get '/users', to: 'admin#all'
  get "/profile/:id", to: 'user#show'
  get '/fetch/:username', to: 'user#fetch'
  post '/signup', to: 'user#signup'
  post '/login', to: 'user#login'
  post '/follow/:id', to: 'user#follow'
  put '/user', to: 'user#update'
  delete '/user', to: 'user#destroy'
  get '/:id/timeline',  to: 'user#timeline'
  put '/role/:id/:role', to: 'admin#change_role'
  post '/subadmin', to: 'admin#new_group'
  get '/group/:id', to: 'admin#fetch_group'
  put '/change/group/:type', to: 'admin#change'
  put 'rights/group/:type', to: 'admin#change_rights'
  post '/careers', to: 'career#create'
  put '/careers/:id', to: 'career#update'
  get '/careers/', to: 'career#all'
  post '/careers/apply/:id', to: 'career#apply'
  get '/careers/:id', to: 'career#fetch_one'
  put '/approve/:id', to: 'meta#confirm'
  post '/apply/office', to: 'meta#run_for_office'
  post '/apply/volunteer', to: 'meta#volunteer'
  post '/apply/sponsor', to: 'meta#sponsor'
  get'/application/:key', to: 'meta#fetch'
  post '/fetch', to: 'user#render_user'
  post '/send/reset/password/:id', to: 'user#send_reset_password'
  get '/reset/password', to: 'user#reset_password'
  get '/confirm/mail', to: 'user#confirm_mail'
  get '/party/member/new/:id', to: 'user#new_party_member'
  post '/block/:id', to: 'user#block_user'
  end 

  resources :users do
    resources :posts
  end
end
