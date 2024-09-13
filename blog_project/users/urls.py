from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerCreateView, LoginView, CustomerProfileView, ChangePasswordView, LogoutView, CustomerUpdateView, csrf_token, DeleteCustomerView


router = DefaultRouter()
router.register(r'create', CustomerCreateView)

urlpatterns = [
  path('', include(router.urls)),
  path("login/", LoginView.as_view(), name='login'),
  path('logout/', LogoutView.as_view(), name='logout'),
  path('profile/', CustomerProfileView.as_view(), name='profile'),
  path('update/', CustomerUpdateView.as_view(), name='profile'),
  path('change-password/', ChangePasswordView.as_view()),
  path('delete/', DeleteCustomerView.as_view()),
  path('csrf-token/', csrf_token, name='csrf_token'),
]
