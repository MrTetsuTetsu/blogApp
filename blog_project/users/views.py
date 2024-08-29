from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics, status
from .models import Customer
from .serializers import CustomerSerializer
from rest_framework.response import Response

class CustomerCreateView(generics.CreateAPIView):
    queryset = Customer .objects.all()
    serializer_class = CustomerSerializer
    def create(self, request, xargs, **kwargs):
        serializer = self.get_serializer (data=request. data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(f"Validation error: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self. perform_create(serializer)
        headers = self. get_success_headers (serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)