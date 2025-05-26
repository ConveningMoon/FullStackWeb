import os
import datetime
import subprocess
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    help = 'Backs up PostgreSQL database'

    def handle(self, *args, **options):
        # Create backups directory if it doesn't exist
        backups_dir = os.path.join(settings.BASE_DIR, 'backups')
        if not os.path.exists(backups_dir):
            os.makedirs(backups_dir)
        
        # Generate filename with timestamp
        timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_file = os.path.join(backups_dir, f'backup_{timestamp}.sql')
        
        # Parse database URL to get connection details
        db_url = settings.DATABASES['default']['HOST']
        db_name = settings.DATABASES['default']['NAME']
        db_user = settings.DATABASES['default']['USER']
        db_pass = settings.DATABASES['default']['PASSWORD']
        
        # Run pg_dump command
        env = os.environ.copy()
        env['PGPASSWORD'] = db_pass
        
        cmd = [
            'pg_dump',
            '-h', db_url,
            '-U', db_user,
            '-d', db_name,
            '-f', backup_file
        ]
        
        try:
            subprocess.run(cmd, env=env, check=True)
            self.stdout.write(self.style.SUCCESS(f'Successfully backed up database to {backup_file}'))
        except subprocess.CalledProcessError as e:
            self.stdout.write(self.style.ERROR(f'Database backup failed: {e}'))
