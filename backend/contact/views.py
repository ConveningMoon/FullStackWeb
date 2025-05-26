# contact/views.py
import logging
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import ContactMessage, NewsletterSubscription
from .serializers import ContactMessageSerializer, NewsletterSubscriptionSerializer

logger = logging.getLogger('portfolio')

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['post']  # Only allow POST requests
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Call perform_create to save the instance
        self.perform_create(serializer)
        
        # Log the successful message creation
        logger.info(f"Contact form submitted by {serializer.data.get('email')}")
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Your message has been sent successfully! We'll get back to you soon."},
            status=status.HTTP_201_CREATED, 
            headers=headers
        )


class NewsletterSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer
    http_method_names = ['post']  # Only allow POST requests
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        # Check if email already exists
        email = request.data.get('email')
        if NewsletterSubscription.objects.filter(email=email).exists():
            logger.info(f"Newsletter subscription attempt with existing email: {email}")
            return Response(
                {"message": "You're already subscribed to our newsletter!"},
                status=status.HTTP_200_OK
            )
        
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        logger.info(f"New newsletter subscription: {email}")
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Thank you for subscribing to our newsletter!"},
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
