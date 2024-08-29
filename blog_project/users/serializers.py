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