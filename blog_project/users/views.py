from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics, status
from .models import Customer
from .serializers import CustomerSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated

#csrfトークン取得
from django.http import JsonResponse
from django.middleware.csrf import get_token
#ここまで

def csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

class CustomerCreateView(generics.CreateAPIView):
    queryset = Customer .objects.all()
    serializer_class = CustomerSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer (data=request. data)
        print(serializer)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(f"Validation error: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self. perform_create(serializer)
        headers = self. get_success_headers (serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
#ログイン
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        print(request)
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": "Logged in successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
#ログインしていたらユーザー情報表示
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = CustomerSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
#ログアウト
class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('sessionid', path='/', samesite='Lax')  # クッキー削除
        return response
    
