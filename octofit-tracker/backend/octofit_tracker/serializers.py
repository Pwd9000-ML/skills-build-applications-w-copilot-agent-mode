from rest_framework import serializers
from .models import FitnessUser, Team, Activity, Leaderboard, Workout
from bson import ObjectId

class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return ObjectId(data)

class UserSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    
    class Meta:
        model = FitnessUser
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

class TeamSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    
    class Meta:
        model = Team
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    
    class Meta:
        model = Activity
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Leaderboard
        fields = '__all__'

class WorkoutSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    
    class Meta:
        model = Workout
        fields = '__all__'
