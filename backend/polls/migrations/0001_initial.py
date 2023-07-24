# Generated by Django 4.1.5 on 2023-06-29 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='default text', max_length=250)),
                ('slug', models.SlugField(max_length=250, unique=True)),
                ('poll_image', models.ImageField(upload_to='media/poll')),
                ('poll_banner', models.ImageField(upload_to='media/poll')),
                ('poll_info', models.CharField(max_length=3000, null=True)),
                ('intro_text', models.CharField(default='default text', max_length=250)),
                ('discription', models.CharField(max_length=450, null=True)),
                ('date', models.DateField()),
                ('count_down', models.DateTimeField()),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
    ]
