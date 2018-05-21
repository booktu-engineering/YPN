Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'user#all'
  get "/profile/:id", to: 'user#show'
  post '/signup', to: 'user#signup'
  post '/login', to: 'user#login'
  post '/follow/:id', to: 'user#follow'
  put '/user', to: 'user#update'
  delete '/user', to: 'user#destroy'
  get '/:id/timeline',  to: 'user#timeline';

  resources :users do
    resources :posts
  end
end
