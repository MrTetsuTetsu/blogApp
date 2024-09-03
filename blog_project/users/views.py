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
    
#プロフィール更新
class UserUpdateView(generics.UpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # 現在のログインユーザーを取得して更新対象にする
        return self.request.user

    def update(self, request, *args, **kwargs):
        print(self.get_object())
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(f"Validation error: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # 更新後にキャッシュをクリアする場合
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    
