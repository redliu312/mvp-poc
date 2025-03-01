from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Task
from .serializers import TaskSerializer

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        })
    
    return Response({'error': 'Invalid credentials'}, status=400)


class TaskViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.action == 'list':
            if 'scheduled' in self.request.path:
                return Task.objects.filter(is_scheduled=True)
            elif 'trigger' in self.request.path:
                return Task.objects.filter(is_triggered=True)
            return Task.objects.all()

    @action(detail=False, methods=['POST'], permission_classes=[permissions.IsAuthenticated])
    def trigger(self, request):
        """Create a new Task object and return its details"""
        task = Task.objects.create(
            title="New Triggered Task",  # Mock task title
            args="{}",  # You can pass real args here
            is_triggered=True
        )

        serializer = TaskSerializer(task)
        return Response(serializer.data, status=201)