# services/tests.py
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import ServiceCategory, Service

class ServiceAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = ServiceCategory.objects.create(name="Web Development")
        self.service = Service.objects.create(
            title="Responsive Web Design",
            description="Design that works on all devices",
            category=self.category,
        )
    
    def test_get_services(self):
        url = reverse('service-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], 'Responsive Web Design')
