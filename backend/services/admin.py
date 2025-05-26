# services/admin.py
from django.contrib import admin
from .models import Service, ServiceCategory


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description', 'created_at', 'updated_at')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_featured', 'price', 'created_at', 'updated_at')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'description', 'category__name')