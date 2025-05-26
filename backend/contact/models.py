# contact/models.py
import logging
from django.db import models
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger('portfolio')

class ContactMessage(models.Model):
    STATUS_CHOICES = (
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('responded', 'Responded'),
        ('closed', 'Closed'),
    )
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Message from {self.name}: {self.subject}"
    
    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        
        if is_new:
            logger.info(f"New contact message received from: {self.email}")
            # Send email notification to admin
            try:
                send_mail(
                    f'New Contact Form Submission: {self.subject}',
                    f'Name: {self.name}\nEmail: {self.email}\nPhone: {self.phone}\n\nMessage:\n{self.message}',
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.ADMIN_EMAIL],
                    fail_silently=False,
                )
                logger.info(f"Notification email sent for message from: {self.email}")
            except Exception as e:
                logger.error(f"Failed to send notification email: {str(e)}")


class NewsletterSubscription(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        
        if is_new:
            logger.info(f"New newsletter subscription: {self.email}")
