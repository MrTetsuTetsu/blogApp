from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from .views import CustomerCreateView, LoginView, UserProfileView, LogoutView, csrf_token

urlpatterns = [
    path('CreateCustomer/', CustomerCreateView.as_view(), name='CreateCustomer'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('csrf-token/', csrf_token, name='csrf_token'),
]
