"""The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.urls import path, re_path
from django.views.generic.base import TemplateView


#from views
from .import views
from .api.authentication import RegisterUserAPIView, UserDetailAPI, MyTokenObtainPairView



urlpatterns = [
    path('register', RegisterUserAPIView.as_view()),
    path('user-details', UserDetailAPI.as_view()),
    path('home-page-data', views.homePageData, name="home_page_data" ),
    path('search', views.SearchListView.as_view(), name="search"),
]

from rest_framework_simplejwt.views import (TokenRefreshView,)
urlpatterns += [
    path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    re_path(r"^verify-email/(?P<key>[-:\w]+)/$",TemplateView.as_view(),name="account_confirm_email",),
]