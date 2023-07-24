from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.conf import settings


#//////////
from ..models import MyUsers

#Serializer to Get User Details using Django Token Authentication
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUsers
        fields = ["first_name", "last_name", "username"]



#Serializer to Register User
class RegisterSerializer(serializers.ModelSerializer):

    #this is to validate that the email of the registering user dose not exist in the data before therefore making sure it is unique
    email = serializers.EmailField(required=True,validators=[UniqueValidator(queryset=MyUsers.objects.all())])

    #the passwords for the registering user
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    #how the class would carry out or behave for some identification
    #NOTE: the methods for the original class should'nt be included in the meta class
    class Meta:
        model = MyUsers
        fields = ('username', 'password', 'password2','email',)

        #added extra attribute(arguments) to the fields below
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }
        
    #this would check if both passwords are the same or it returns an error
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
            {"password": "Password fields didn't match."})
        return attrs
    
    """ def email_verification(self, attrs):
        
        return print('hello winter: ',attrs['email']) """

    #this method would create the new user
    def activateEmail(request):
        print('started')
        subject = 'welcome to GFG world'
        message = f'Hi, thank you for registering in geeksforgeeks.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['christianezekwem101@gmail.com']
        send_mail( subject, message, email_from, recipient_list )
        print('sent mail')

    def create(self, validated_data,**kwargs):
        self.activateEmail()
        user = MyUsers.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            #first_name=validated_data['first_name'],
            #last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
       