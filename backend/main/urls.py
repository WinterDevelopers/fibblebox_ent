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

from rest_framework_simplejwt.views import TokenRefreshView

#from views
from .import views

app_name = "main"

urlpatterns = [
    path('register-user', views.ResgisterUser.as_view(), name="register_name" ),
    path('login', views.LoginUser.as_view(), name="login"),
    path('refresh', TokenRefreshView.as_view(), name="refresh"),
    path('change-password', views.changePassword, name="change_password"),
    path('recover-forgotten-password', views.sendForgottenPassword, name="recover_forgotten_password"),
    path("reset-frogotten-password", views.resetForgottenPassword, name="reset_forgotten_password"),
    path("verify-reset-forgotten-password/<slug:uidb64>/<slug:token>/", views.verifyResetForgottenPassword, name="verify_reset_forgotten_password"),
    path('user-details', views.userDetails, name="user_details"),
    path('activate/<slug:uidb64>/<slug:token>/', views.activateEmail, name="activate"),
    path('home-page-data', views.homePageData, name="home_page_data" ),
    path('search', views.SearchListView.as_view(), name="search"),
]
