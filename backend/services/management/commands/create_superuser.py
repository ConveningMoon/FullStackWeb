from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = 'Create a superuser if it does not exist'

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "admin")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@example.com")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "password123")

        if not User.objects.filter(username=username).exists():
            self.stdout.write("Creating superuser...")
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(f"Superuser created: {username}")
        else:
            self.stdout.write("Superuser already exists.")
