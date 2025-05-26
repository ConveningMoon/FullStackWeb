import os
from celery import Celery

# Set the default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')

app = Celery('portfolio_project')

# Use a string here to avoid pickle sending tasks to workers
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs
app.autodiscover_tasks()
