from django.contrib.auth import get_user_model, authenticate
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view,permission_classes 
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, filters

from rest_framework_simplejwt.views import TokenObtainPairView

from .homePageData import HomePageData

from main.models import CustomUser
from main.serializers import RegisterSerializer, TokenAuthUserSerializer, MyUsersSerializers
from main.token import activate_account_token
from main.utils import SendForgottenPasswordMail
from polls.models import Poll
from polls.serializers import PollsSerializers

# Create your views here.

#all the data that would be needed for the client side home page

class ResgisterUser(generics.CreateAPIView):
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer

@api_view(["GET","POST"])
@permission_classes([AllowAny,])
def activateEmail(request,uidb64,token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None

    if user is not None and activate_account_token.check_token(user,token):
        if not user.is_active:
            user.is_active = True
            user.email_verification = True
            user.save()
            return Response('Activated',202)
        else:
            return Response('',304)
    else:
        return Response('',401)
  

@api_view(['GET'])
@permission_classes([AllowAny])
def homePageData(request):
    poll_query = HomePageData()
    polls = poll_query.getHomePolls()
    respone_data = {'trending-polls':polls}
    return Response(respone_data,200)

class SearchListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Poll.objects.all()
    serializer_class = PollsSerializers
    filter_backends = [filters.SearchFilter]
    search_fields = ['^name', '$name']

class LoginUser(TokenObtainPairView):
    permission_classes = ([AllowAny])
    api_view = (["POST"])
    serializer_class = TokenAuthUserSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def logoutUser(request):
    return Response({'logged out'},200)

@api_view(["POST"])
@permission_classes([AllowAny])
def sendForgottenPassword(request):
    data = request.data
    email = data["email"]

    User = get_user_model()
    user = get_object_or_404(User, email=email)

    if user.is_active:
        mail = SendForgottenPasswordMail(email,user)
        mail_response = mail.sendEmail()
        if mail_response:
            return Response('', 200)
    else:
        return Response("", 409)

#Important!!! this would POST in standard development and production
@api_view(["GET"])
@permission_classes([AllowAny])
def verifyResetForgottenPassword(request, uidb64, token):
    #wont need this parameters above
    #needed details 
    #uidb64
    #token
    #new_password

    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None

    if user is not None and activate_account_token.check_token(user,token):   
        return Response("", 200)
    else:
        return Response("", 403)

@api_view(["POST"])
@permission_classes([AllowAny])
def resetForgottenPassword(request):
    data = request.data
    print(data)
    uidb64 = data["uidb64"]
    new_password = data["password"]
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None

    if user is not None:
        user.set_password(new_password)
        user.save()
        return Response("",201)
    else:
        return Response("",403)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def changePassword(request):
    data = request.data
    old_password = data["old_password"]
    new_password = data["new_password"]
    User = get_user_model()

    user_email = request.user.email
    #print(user_email)
    authenticated = authenticate(email=user_email, password=old_password)
    if authenticated:
        user = User.objects.get(email=user_email)
        user.set_password(new_password)
        user.save()
        return Response("",202)
    else:
        return Response("",403)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userDetails(request):
    id = request.user.id
    user = get_object_or_404(CustomUser, id=id)
    user_serialized = MyUsersSerializers(user)
    return Response(user_serialized.data,200)   

