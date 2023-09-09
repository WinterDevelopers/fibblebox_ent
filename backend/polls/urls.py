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
from . import views

app_name = 'polls'

urlpatterns = [
    path('', views.getPolls, name='get_polls'),
    path('<slug:slug>', views.getPollPage, name='poll_page'),
    path('candidate/<slug:slug>', views.getCandidates, name='candidate-page'),
    path('create-payment/', views.getPaymentRef, name='create-payment-ref'),
    path('email-payment/', views.emailPaymentVerification, name='email-payment-page'),
    path('purchase-coupons/', views.couponPayment, name="purchase-coupons"),
    path('coupon-payment/', views.couponPaymentVerification, name="coupon-payment"),
    path('coupon-vote/', views.couponVoting, name="coupon-voting"),
    path('verify-reference/<slug:ref>', views.verifyReference, name="verify-reference"),
]