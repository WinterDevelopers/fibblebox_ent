from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer,RegisterSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from django.http import HttpResponse

#///////
from ..models import MyUsers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


#here we modified this jwt class(TokenObtainPairSerializer) to encode our email not the name 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims(modified to email)
        token['email'] = user.email
        hddd = HttpResponse("Cookie Set")
        hddd.set_cookie(key='xxx',value='cllccc', httponly=True)
        # ...'token' this contains all the access and referesh token
        return token

#then we create our own MyTokenObtainPairView to overide the default TokenObtainPairView 
# and set the serializer_class = MyTokenObtainPairSerializer (which is the one we create to modify the default)
class MyTokenObtainPairView(TokenObtainPairView):
   serializer_class = MyTokenObtainPairSerializer

# Class based view to Get User Details using Token Authentication
class UserDetailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)

  def get(self,request,*args,**kwargs):
    user = MyUsers.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

#Class based view to register new user
class RegisterUserAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer