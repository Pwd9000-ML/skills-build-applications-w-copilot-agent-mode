from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from .models import FitnessUser, Team, Activity, Leaderboard, Workout

@api_view(['GET'])
def api_root(request, format=None):
    base_url = 'https://ideal-space-eureka-64v95r4wg9wcrx4j-8000.app.github.dev/'
    
    # If request is coming from localhost, use that instead
    host = request.get_host()
    if 'localhost' in host or '127.0.0.1' in host:
        scheme = request.scheme
        base_url = f'{scheme}://{host}/'
    
    return Response({
        'users': base_url + 'api/users/',
        'teams': base_url + 'api/teams/',
        'activities': base_url + 'api/activities/',
        'leaderboard': base_url + 'api/leaderboard/',
        'workouts': base_url + 'api/workouts/'
    })

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = FitnessUser.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows teams to be viewed or edited.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows activities to be viewed or edited.
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows leaderboard entries to be viewed or edited.
    """
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows workouts to be viewed or edited.
    """
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
