from django.db import models

class UserProfile(models.Model):
    """
    Model to store user profile information.
    """
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    password = models.CharField(max_length=128)  # Store hashed password

# Create your models here.
