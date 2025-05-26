
# services/management/commands/add_default_services.py
import os
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.core.files.base import ContentFile
from services.models import ServiceCategory, Service

class Command(BaseCommand):
    help = 'Adds default services to the database'

    def handle(self, *args, **options):
        # Create or get the "Development" category
        dev_category, created = ServiceCategory.objects.get_or_create(
            name="Development",
            defaults={
                'slug': 'development',
                'description': 'Custom software development services for various platforms and needs'
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created service category: {dev_category.name}'))
        
        # Create or get the "Digital Marketing" category
        marketing_category, created = ServiceCategory.objects.get_or_create(
            name="Digital Marketing",
            defaults={
                'slug': 'digital-marketing',
                'description': 'Services to enhance your online presence and reach'
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created service category: {marketing_category.name}'))
        
        # Create or get the "Automation" category
        automation_category, created = ServiceCategory.objects.get_or_create(
            name="Automation",
            defaults={
                'slug': 'automation',
                'description': 'Services to automate repetitive tasks and improve efficiency'
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created service category: {automation_category.name}'))

        # Define services
        services = [
            {
                'title': 'Web Development',
                'category': dev_category,
                'description': """
                    Professional web development services tailored to your needs. We create responsive, 
                    user-friendly websites optimized for all devices. Our development stack includes.
                    From simple landing pages to complex web applications, we deliver high-quality 
                    solutions that help your business grow online:
                """,
                'features':[
                    "Frontend: React, Vue.js, Next.js",
                    "Backend: Django, Node.js, Laravel",
                    "Database: PostgreSQL, MySQL, MongoDB"
                ],
                'short_description': 'Custom, responsive website development using modern technologies',
                'is_featured': True,
                'price': 1499.99 
            },
            {
                'title': 'App Development',
                'category': dev_category,
                'description': """
                    Mobile application development for iOS and Android platforms. We build native 
                    and cross-platform applications using modern frameworks.                   
                    Our app development process includes UX/UI design, development, testing, 
                    and deployment to app stores:
                """,
                'features':[
                    "React Native for cross-platform development",
                    "Swift for iOS native apps",
                    "Kotlin for Android native apps",
                    "Flutter for beautiful UI and performance"
                ],
                'short_description': 'Native and cross-platform mobile apps for iOS and Android',
                'is_featured': True,
                'price': 2499.99
            },
            {
                'title': 'Social Media Management',
                'category': marketing_category,
                'description': """
                    Comprehensive social media management services to boost your online presence.
                    Our services include.
                    We cover all major platforms including Facebook, Instagram, Twitter, LinkedIn,
                    and TikTok to ensure your brand reaches the right audience:
                """,
                'features':[
                    "Content creation and curation",
                    "Posting schedule management",
                    "Engagement with followers",
                    "Analytics and reporting",
                    "Ad campaign management"
                ],
                'short_description': 'Content creation, posting and engagement for all social platforms',
                'is_featured': False,
                'price': 799.99
            },
            {
                'title': 'Automations',
                'category': automation_category,
                'description': """
                    Custom automation solutions to streamline your business processes and save time.
                    Our automation services include.                    
                    We use tools like Zapier, n8n, Python, and custom APIs to create seamless 
                    automation solutions that reduce manual work and increase efficiency:
                """,
                'features':[
                    "Workflow automation",
                    "Data processing and ETL pipelines",
                    "Email and notification systems",
                    "Task scheduling and management",
                    "Integration between different software systems"
                ],
                'short_description': 'Custom workflow and process automation to save time and resources',
                'is_featured': True,
                'price': 1299.99
            },
        ]

        # Add services to the database
        for service_data in services:
            slug = slugify(service_data['title'])
            
            # Check if service already exists
            if not Service.objects.filter(slug=slug).exists():
                # Create a blank image placeholder (in a real scenario, you would have actual images)
                # This is a placeholder implementation - in production you would need real images
                service = Service(
                    title=service_data['title'],
                    slug=slug,
                    category=service_data['category'],
                    description=service_data['description'].strip(),
                    short_description=service_data['short_description'],
                    features=service_data['features'],
                    is_featured=service_data['is_featured'],
                    price=service_data['price'],
                )
                
                # This is a placeholder. In practice, you would need to add real images
                # For now, we'll skip the image to avoid errors
                # Uncomment this section when you have actual images to add
                """
                image_name = f"{slug}.jpg"
                image_path = os.path.join('fixtures', 'images', image_name)
                if os.path.exists(image_path):
                    with open(image_path, 'rb') as img_file:
                        service.image.save(image_name, ContentFile(img_file.read()), save=False)
                """
                
                # Note: Since the model requires an image but we don't have one,
                # you'll need to either:
                # 1. Make the image field nullable in the model
                # 2. Provide actual images
                # 3. Modify this script to use dummy images
                
                # Save the service (will raise an error if image is required)
                try:
                    service.save()
                    self.stdout.write(self.style.SUCCESS(f'Created service: {service.title}'))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Failed to create service {service_data["title"]}: {str(e)}'))
            else:
                self.stdout.write(self.style.WARNING(f'Service already exists: {service_data["title"]}'))

        self.stdout.write(self.style.SUCCESS('Default services added successfully'))

