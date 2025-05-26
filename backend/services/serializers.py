# services/serializers.py
from rest_framework import serializers
from .models import Service, ServiceCategory

class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'slug', 'description']


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'category', 'category_name', 
            'description', 'short_description', 'image', 
            'is_featured', 'price', 'features', 'created_at'
        ]


class ServiceDetailSerializer(ServiceSerializer):
    class Meta(ServiceSerializer.Meta):
        fields = ServiceSerializer.Meta.fields + ['updated_at']
