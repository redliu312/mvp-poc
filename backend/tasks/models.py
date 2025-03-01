from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

def get_default_user():
    """Returns the first user as default (adjust as needed)"""
    return User.objects.first().id  # Ensure this user exists

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks", default=get_default_user)  
    title = models.CharField(max_length=200)
    args = models.CharField(max_length=200)
    is_scheduled = models.BooleanField(default=False)
    is_triggered = models.BooleanField(default=False)
    status = models.CharField(max_length=50, default="pending")

    def __str__(self):
        return f"{self.title} (User: {self.user.username})"