from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from .views import CustomerCreateView

urlpatterns = [
    path('CreateCustomer/', CustomerCreateView.as_view(), name='CreateCustomer')
]
