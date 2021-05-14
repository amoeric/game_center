Rails.application.routes.draw do
  root to: "tictac#index"
  resources :sudoo, only: :index
  resources :tictac, only: :index
end
