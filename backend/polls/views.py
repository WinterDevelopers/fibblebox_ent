from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Poll, Candidate, EmailPayment
from .serializers import PollsSerializers
from .getPollPageData import PollData
from .getCandidateData import CandidateData

from .coupon_generator import CouponGenerator

# Create your views here.
@api_view(["GET"])
@permission_classes([AllowAny])
def getPolls(request):
    polls = Poll.objects.all()
    serialized_polls = PollsSerializers(polls, many=True)

    return Response(serialized_polls.data, 200)

@api_view(["GET"])
@permission_classes([AllowAny])
def getPollPage(request,slug):
    poll_data = PollData(slug)
    pollRes = poll_data.getPollData()

    return Response(pollRes, 200)

@api_view(["GET"])
@permission_classes([AllowAny])
def getCandidates(request,slug):
    candidate = CandidateData(slug)
    candidate_data = candidate.getCandidateData()
    return Response(candidate_data, 200)

@api_view(["POST"])
@permission_classes([AllowAny])
def getPaymentRef(request):
    print(request.data)
    data = request.data
    
    email = data['email']
    candidate_id = data['candidate_id']
    votes = data['votes']
    candidate = get_object_or_404(Candidate, id=candidate_id)
    
    try:
        unfufiled_transaction = EmailPayment.objects.get(email=email, transaction_status=False)
        if unfufiled_transaction:
            unfufiled_transaction.delete()

    except:
        pass

    finally:
        new_transaction = EmailPayment.objects.create(email=email, votes=votes, candidate= candidate)

    res_data = {"reference":str(new_transaction.reference), "amount":str(new_transaction.amount), "votes":str(new_transaction.votes), 'email':str(new_transaction.email)}
    return Response(res_data, 201)


@api_view(['POST'])
@permission_classes([AllowAny])
def emailPaymentVerification(request):

    data = request.data
    reference = data['reference']
    email_payment = get_object_or_404(EmailPayment,reference=reference)
    #verify the payment
    email_payment_verification = email_payment.verified_payment()
    #if the payment is verified
    if email_payment_verification:
        #confirmed transact and set status of the transact to True
        """ email_payment.transaction_status = True """
        response_data = {'votes':email_payment.votes}
        candidate = get_object_or_404(Candidate, id=email_payment.candidate.id)
        candidate.votes += email_payment.votes
        candidate.save()
        email_payment.save()
        return Response(response_data, 202)

    else:
        return Response('failed',500)

@api_view(['POST'])
@permission_classes([AllowAny])
def couponPayment(request):

    data = request.data
    