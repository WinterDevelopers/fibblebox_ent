from django.shortcuts import render
from django.conf import settings
from django.core.mail import send_mail
#from ..fibblebox import settings 

# Create your views here.

def index(request):
    
    template_name = 'index.html'
    context = {'winter':'chris'}
  
    return render(request,template_name,context)