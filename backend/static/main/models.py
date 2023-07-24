from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from datetime import date
# Create your models here.

class MyUsers(AbstractUser):
    STATUS = (('customer', 'customer'),
              ('staff','staff'),
              ('admin', 'admin')
              )

    username = models.CharField(max_length = 50, blank = True, null = True, unique = True)
    email = models.EmailField(_('email address'), unique = True)
    status = models.CharField(max_length=50, default='customer',choices=STATUS)
    email_verification = models.BooleanField(default=False)
    
    #additional fields
    native_name = models.CharField(max_length = 5)
    phone_no = models.CharField(max_length = 10)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):

        return "{}".format(self.email)

