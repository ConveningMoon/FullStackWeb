from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 
            'description', 'short_description', 'image', 
            'is_featured', 'features', 'created_at'
        ]


class ServiceDetailSerializer(ServiceSerializer):
    class Meta(ServiceSerializer.Meta):
        fields = ServiceSerializer.Meta.fields + ['updated_at']
