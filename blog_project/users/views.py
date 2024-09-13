from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics, status, views
from .models import Customer
from .serializers import CustomerSerializer, LoginSerializer, ChangePasswordSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from rest_framework.permissions import IsAuthenticated


#csrfトークン取得
from django.http import JsonResponse
from django.middleware.csrf import get_token
#ここまで

def csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

class CustomerCreateView(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(f"Validation error: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer) # データベース保存
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LoginView(views.APIView):
    def post(self, request):
        print(0000000)
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.data['username']
            password = serializer.data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                response = Response({"message": "Login successful"}, status=status.HTTP_200_OK)
                return response
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        customer = request.user
        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)

#ログアウト
class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('sessionid', path='/', samesite='Lax')  # クッキー削除
        return response

class CustomerUpdateView(generics.UpdateAPIView):
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
    
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user.set_password(serializer.data['new_password'])
            user.save()
            return Response({"message": "パスワードが正常に変更されました。"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteCustomerView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({"message": "アカウントが正常に削除されました。"}, status=status.HTTP_200_OK)
