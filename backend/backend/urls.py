from django.contrib import admin
from django.urls import path, include
from tasks.views import login_view, TaskViewSet
from rest_framework.routers import DefaultRouter

# Register viewset routes
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename="tasks")  # Add basename to avoid potential issues

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', login_view),
    path('api/', include(router.urls)),  # Includes all routes from TaskViewSet
    path('api/tasks/trigger/', TaskViewSet.as_view({'post': 'trigger'}), name='trigger-task'),  # Add trigger endpoint
]