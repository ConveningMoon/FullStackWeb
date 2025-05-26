from celery import shared_task
from django.core.management import call_command
import logging

logger = logging.getLogger('portfolio')

@shared_task
def cleanup_old_sessions():
    """Clean up expired sessions from the database"""
    logger.info("Running session cleanup task")
    call_command('clearsessions')
    return "Sessions cleaned up"

@shared_task
def backup_database():
    """Create a database backup"""
    logger.info("Running database backup task")
    call_command('backup_db')
    return "Database backed up"
