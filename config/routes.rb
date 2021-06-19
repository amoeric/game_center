Rails.application.routes.draw do
  root to: "welcome#index"

  scope :games, controller: :games, as: :games do
    get :sudo
    get :tictac
  end
end
