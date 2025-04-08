from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import timedelta
from bson import ObjectId

class UserModelTests(TestCase):
    def setUp(self):
        User.objects.create(
            _id=ObjectId(),
            username="testuser",
            email="test@example.com",
            password="testpassword"
        )

    def test_user_creation(self):
        user = User.objects.get(username="testuser")
        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(str(user), "testuser")

class TeamModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            _id=ObjectId(),
            username="teammember",
            email="teammember@example.com",
            password="testpassword"
        )
        self.team = Team.objects.create(
            _id=ObjectId(),
            name="Test Team"
        )
        self.team.members.add(self.user)

    def test_team_creation(self):
        team = Team.objects.get(name="Test Team")
        self.assertEqual(str(team), "Test Team")
        self.assertEqual(team.members.count(), 1)
        self.assertEqual(team.members.first().username, "teammember")

class ActivityModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            _id=ObjectId(),
            username="activityuser",
            email="activity@example.com",
            password="testpassword"
        )
        self.activity = Activity.objects.create(
            _id=ObjectId(),
            user=self.user,
            activity_type="Running",
            duration=timedelta(minutes=30)
        )

    def test_activity_creation(self):
        activity = Activity.objects.get(activity_type="Running")
        self.assertEqual(activity.user.username, "activityuser")
        self.assertEqual(activity.duration, timedelta(minutes=30))
        self.assertEqual(str(activity), "activityuser - Running")

class LeaderboardModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            _id=ObjectId(),
            username="leaderuser",
            email="leader@example.com",
            password="testpassword"
        )
        self.leaderboard = Leaderboard.objects.create(
            _id=ObjectId(),
            user=self.user,
            score=100
        )

    def test_leaderboard_creation(self):
        leaderboard = Leaderboard.objects.get(user__username="leaderuser")
        self.assertEqual(leaderboard.score, 100)
        self.assertEqual(str(leaderboard), "leaderuser - 100")

class WorkoutModelTests(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            _id=ObjectId(),
            name="Test Workout",
            description="A test workout",
            difficulty="intermediate",
            duration=45
        )

    def test_workout_creation(self):
        workout = Workout.objects.get(name="Test Workout")
        self.assertEqual(workout.difficulty, "intermediate")
        self.assertEqual(workout.duration, 45)
        self.assertEqual(str(workout), "Test Workout")

class APITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            _id=ObjectId(),
            username="apiuser",
            email="api@example.com",
            password="testpassword"
        )

    def test_api_root(self):
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

    def test_user_list(self):
        response = self.client.get(reverse('user-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['username'], 'apiuser')
