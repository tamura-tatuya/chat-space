Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, onry: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
  end
  resources :messages, only: :index
end
