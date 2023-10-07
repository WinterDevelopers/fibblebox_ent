from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from main.models import CustomUser

class CustomerUserAdmin(BaseUserAdmin):
    #form = UserChangeForm
    fieldsets = (
        (None, {'fields': ('email', 'password', )}),

        (_('Personal info'), {'fields': ('first_name', 'last_name')}),

        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser','groups', 'user_permissions','status')}),

        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        
        (_('user_info'), {'fields': ('username','email_verification')}),
        )
                
    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ['email', 'first_name', 'last_name', 'email_verification']
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email', )

admin.site.register(CustomUser, CustomerUserAdmin)
# Register your models here.
