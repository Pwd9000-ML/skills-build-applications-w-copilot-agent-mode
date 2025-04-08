from django.core.management.base import BaseCommand
from octofit_tracker.models import FitnessUser, Team, Activity, Leaderboard, Workout
from django.conf import settings
from pymongo import MongoClient
from datetime import timedelta
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['HOST'], settings.DATABASES['default']['PORT'])
        db = client[settings.DATABASES['default']['NAME']]

        # Drop existing collections
        db.fitnessuser.drop()
        db.team.drop()
        db.activity.drop()
        db.leaderboard.drop()
        db.workout.drop()

        self.stdout.write(self.style.WARNING('Dropped existing collections. Creating new test data...'))

        # Create users
        users = [
            FitnessUser(_id=ObjectId(), username='thundergod', email='thundergod@merington.edu', password='thundergodpassword'),
            FitnessUser(_id=ObjectId(), username='metalgeek', email='metalgeek@merington.edu', password='metalgeekpassword'),
            FitnessUser(_id=ObjectId(), username='zerocool', email='zerocool@merington.edu', password='zerocoolpassword'),
            FitnessUser(_id=ObjectId(), username='crashoverride', email='crashoverride@merington.edu', password='crashoverridepassword'),
            FitnessUser(_id=ObjectId(), username='sleeptoken', email='sleeptoken@merington.edu', password='sleeptokenpassword'),
        ]
        
        for user in users:
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Created user: {user.username}'))

        # Create teams
        blue_team = Team(_id=ObjectId(), name='Blue Team')
        blue_team.save()
        gold_team = Team(_id=ObjectId(), name='Gold Team')
        gold_team.save()
        
        # Add members to Blue Team (first 2 users)
        for user in users[:2]:
            blue_team.members.add(user)
        
        # Add members to Gold Team (last 3 users)
        for user in users[2:]:
            gold_team.members.add(user)
            
        self.stdout.write(self.style.SUCCESS(f'Created teams: Blue Team, Gold Team'))

        # Create activities
        activities = [
            Activity(_id=ObjectId(), user=users[0], activity_type='Cycling', duration=timedelta(hours=1)),
            Activity(_id=ObjectId(), user=users[1], activity_type='Crossfit', duration=timedelta(hours=2)),
            Activity(_id=ObjectId(), user=users[2], activity_type='Running', duration=timedelta(hours=1, minutes=30)),
            Activity(_id=ObjectId(), user=users[3], activity_type='Strength', duration=timedelta(minutes=30)),
            Activity(_id=ObjectId(), user=users[4], activity_type='Swimming', duration=timedelta(hours=1, minutes=15)),
        ]
        
        for activity in activities:
            activity.save()
            self.stdout.write(self.style.SUCCESS(f'Created activity: {activity.activity_type} for {activity.user.username}'))

        # Create leaderboard entries
        leaderboard_entries = [
            Leaderboard(_id=ObjectId(), user=users[0], score=100),
            Leaderboard(_id=ObjectId(), user=users[1], score=90),
            Leaderboard(_id=ObjectId(), user=users[2], score=95),
            Leaderboard(_id=ObjectId(), user=users[3], score=85),
            Leaderboard(_id=ObjectId(), user=users[4], score=80),
        ]
        
        for entry in leaderboard_entries:
            entry.save()
            self.stdout.write(self.style.SUCCESS(f'Created leaderboard entry: {entry.user.username} - {entry.score}'))

        # Create workouts
        workouts = [
            Workout(_id=ObjectId(), name='Cycling Training', description='Training for a road cycling event', difficulty='intermediate', duration=60),
            Workout(_id=ObjectId(), name='Crossfit', description='Training for a crossfit competition', difficulty='advanced', duration=90),
            Workout(_id=ObjectId(), name='Running Training', description='Training for a marathon', difficulty='intermediate', duration=45),
            Workout(_id=ObjectId(), name='Strength Training', description='Training for strength', difficulty='beginner', duration=30),
            Workout(_id=ObjectId(), name='Swimming Training', description='Training for a swimming competition', difficulty='advanced', duration=75),
        ]
        
        for workout in workouts:
            workout.save()
            self.stdout.write(self.style.SUCCESS(f'Created workout: {workout.name}'))

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))
