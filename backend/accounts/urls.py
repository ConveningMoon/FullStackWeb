from django.urls import path
from .views import RegisterView, LoginView, UserProfileView, LogoutView
from .views import UserListView
from .views import UserDeleteView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDeleteView.as_view(), name='user-delete'),
    path('logout/', LogoutView.as_view(), name='logout'),
]