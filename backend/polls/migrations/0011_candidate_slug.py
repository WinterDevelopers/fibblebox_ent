# Generated by Django 4.1.5 on 2023-07-19 23:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0010_rename_payment_emailpayment'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='slug',
            field=models.SlugField(max_length=150, null=True),
        ),
    ]
