from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from datetime import date
# Create your models here.
class CustomUser(AbstractUser):
    STATUS = (('customer', 'customer'),('staff','staff'), ('admin', 'admin'))
                  
    username = models.CharField(max_length = 50,null = True, unique = True)
    email = models.EmailField(unique=True,null = True)
    status = models.CharField(max_length=50, default='customer',choices=STATUS)
    email_verification = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name',]

    def __str__(self) -> str:
        return str(self.username)
