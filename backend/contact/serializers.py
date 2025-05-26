# contact/serializers.py
from rest_framework import serializers
from .models import ContactMessage, NewsletterSubscription

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message']
        read_only_fields = ['id']


class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ['id', 'email', 'name']
        read_only_fields = ['id']
