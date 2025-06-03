import logging
from django.db import models
from django.core.cache import cache
from django.contrib.postgres.fields import ArrayField

logger = logging.getLogger('portfolio')


class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=255)
    image = models.ImageField(upload_to='services/', null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    features = ArrayField(models.CharField(max_length=200), blank=True, help_text='List of key features', default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', 'title']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        logger.info(f"Saving service: {self.title}")
        # Clear relevant caches
        cache.delete(f'service_{self.slug}')
        cache.delete('featured_services')
        cache.delete(f'category_services_{self.category.slug}')
        super().save(*args, **kwargs)
