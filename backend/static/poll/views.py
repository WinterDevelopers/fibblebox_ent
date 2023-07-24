from django.shortcuts import render

# Create your views here.

def pollHomePage(request):
    template_name = 'poll.html'

    return render(request, template_name)

def contestPage(request):
    template_name = 'contest.html'

    return render(request, template_name)

def candidatePage(request):
    template_name = 'candidate.html'

    return render(request, template_name)

def candidatePaymentPage(request):
    template_name = 'payment.html'

    return render(request, template_name)