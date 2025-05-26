# services/views.py
import logging
from django.core.cache import cache
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Service, ServiceCategory
from .serializers import ServiceSerializer, ServiceDetailSerializer, ServiceCategorySerializer

logger = logging.getLogger('portfolio')

class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = cache.get('service_categories')
        if queryset is None:
            queryset = super().get_queryset()
            cache.set('service_categories', queryset, 3600)  # Cache for 1 hour
        return queryset


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ServiceDetailSerializer
        return ServiceSerializer
    
    def retrieve(self, request, *args, **kwargs):
        slug = kwargs.get('slug')
        service = cache.get(f'service_{slug}')
        
        if service is None:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            service = serializer.data
            cache.set(f'service_{slug}', service, 3600)  # Cache for 1 hour
            
        return Response(service)
    
    @action(detail=False)
    def featured(self, request):
        featured_services = cache.get('featured_services')
        
        if featured_services is None:
            queryset = self.queryset.filter(is_featured=True)
            serializer = self.get_serializer(queryset, many=True)
            featured_services = serializer.data
            cache.set('featured_services', featured_services, 3600)  # Cache for 1 hour
            
        return Response(featured_services)
    
    @action(detail=False, url_path='category/(?P<category_slug>[^/.]+)')
    def by_category(self, request, category_slug=None):
        cache_key = f'category_services_{category_slug}'
        services = cache.get(cache_key)
        
        if services is None:
            queryset = self.queryset.filter(category__slug=category_slug)
            serializer = self.get_serializer(queryset, many=True)
            services = serializer.data
            cache.set(cache_key, services, 3600)  # Cache for 1 hour
            
        return Response(services)
