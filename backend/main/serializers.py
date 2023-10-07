from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from main.models import CustomUser
from main.utils import SendActivationEmail

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from polls.models import Poll


class PollsSerializers(serializers.ModelSerializer):

    class Meta:
        model = Poll
        fields = "__all__"

class MyUsersSerializers(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ["username","email","status"]

class RegisterSerializer(serializers.ModelSerializer):
    #the fields we would need to work on before creating the new user
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=CustomUser.objects.all())] )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password', 'password2',)

        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    #check if both password matches  
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
            {"password": "Password fields didn't match."})
        return attrs
    
    #send mail to email of the new user for activation
    def activateEmail(request,user,email):
        confirm_email = SendActivationEmail(user,email)
        confirm_email.sendEmail()
        

    def create(self, validated_data,**kwargs):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            #first_name=validated_data['first_name'],
            #last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.is_active=False
        #sends activation message
        self.activateEmail(user, validated_data['email'])

        user.save()
        return user

class TokenAuthUserSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        #...'token' this contains the access and referesh token
        return (token)