# Generated by Django 4.1.5 on 2023-07-15 12:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0009_remove_payment_token'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Payment',
            new_name='EmailPayment',
        ),
    ]