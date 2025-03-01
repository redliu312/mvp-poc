from rest_framework import serializers
from .models import Task
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer to return user information"""
    class Meta:
        model = User
        fields = ["id", "username", "email"]  # Customize based on required user fields

class TaskSerializer(serializers.ModelSerializer):
    """Task serializer including user information"""
    user = UserSerializer(read_only=True)  # Nested user info

    class Meta:
        model = Task
        fields = ['id', 'title', 'args', 'is_scheduled', 'is_triggered', 'status', 'user']