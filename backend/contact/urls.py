# contact/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactMessageViewSet, NewsletterSubscriptionViewSet

router = DefaultRouter()
router.register(r'message', ContactMessageViewSet)
router.register(r'newsletter', NewsletterSubscriptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
