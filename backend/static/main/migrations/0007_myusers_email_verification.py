# Generated by Django 4.1.5 on 2023-02-22 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_remove_myusers_password2'),
    ]

    operations = [
        migrations.AddField(
            model_name='myusers',
            name='email_verification',
            field=models.BooleanField(default=False),
        ),
    ]
