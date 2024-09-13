from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Customer
        fields = ('id', 'username', 'email', 'password', 'created_at', 'updated_at', 'is_active')

    def create(self, validated_data):
        customer = Customer.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return customer
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('現在のパスワードが正しくありません。')
        return value

    def validate(self, data):
        if data['current_password'] == data['new_password']:
            raise serializers.ValidationError('新しいパスワードは現在のパスワードと異なる必要があります。')
        return data
