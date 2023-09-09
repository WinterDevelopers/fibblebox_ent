import datetime

from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Poll, Candidate, EmailPayment,CouponPayment, VotingCoupon
from .serializers import PollsSerializers
from .getPollPageData import PollData
from .getCandidateData import CandidateData
from .generateCoupons import CouponGenerator

# Create your views here.
@api_view(["GET"])
@permission_classes([AllowAny])
def getPolls(request):
    polls = Poll.objects.all()
    poll_object = []
    for x in polls:
        poll = get_object_or_404(Poll, id=x.id)
        poll_votes = poll.total_votes
        serialized_polls = PollsSerializers(poll)
        poll_object.append({"poll":serialized_polls.data, "total_votes":poll_votes})

    return Response(poll_object, 200)

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
    data = request.data
    
    email = data['email']
    candidate_id = data['candidate_id']
    votes = data['votes']
    candidate = get_object_or_404(Candidate, id=candidate_id)
    poll = get_object_or_404(Poll, id=candidate.poll.id)

    current_time = datetime.datetime.now()
    poll_count_down = poll.count_down

    #check if the count_down is still valid else stop the process
    if current_time.strftime("%s") <= poll_count_down.strftime("%s"):

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
    else:
        return Response({}, 409)

@api_view(['GET'])
@permission_classes([AllowAny])
def verifyReference(request, ref):
    ref_exist = get_object_or_404(EmailPayment, reference=ref, transaction_status=False)
    if ref_exist:
        return Response({}, 200)
    else:
        return Response({},409)
        
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
        return Response('failed',400)

@api_view(['POST'])
@permission_classes([AllowAny])
def couponPayment(request):
    data = request.data
    email = data['email']
    poll_slug = data['poll_slug']
    number_of_coupons = data['number_of_coupons']
    poll = get_object_or_404(Poll, slug=poll_slug)
    try:
        #check if the email has unfufilled order and then delete as we would create another
        unfufiled_purchase = CouponPayment.objects.get(email=email, verification=False)

        if unfufiled_purchase:
            unfufiled_purchase.delete()

    except:
        pass

    finally:
        new_coupon_purchase = CouponPayment.objects.create(email=email,number_of_coupons=number_of_coupons,poll=poll)

    res_data = {'reference':str(new_coupon_purchase.reference),'amount':str(new_coupon_purchase.amount)}
    return Response(res_data,201)


@api_view(['POST'])
@permission_classes([AllowAny])
def couponPaymentVerification(request):
    data = request.data
    reference = data['reference']
    coupon_payment_query = get_object_or_404(CouponPayment, reference=reference)
    #verify the payment from the verification method in our model Class
    coupon_payment_verification = coupon_payment_query.verified_payment()

    if coupon_payment_verification:
        #then generate the codes and send
        generate_coupon = CouponGenerator(coupon_payment_query.poll, coupon_payment_query.email,coupon_payment_query.number_of_coupons)

        list_of_coupons = generate_coupon.generateCoupons()

        create_coupon_file = generate_coupon.couponListToFile(list_of_coupons)

        if create_coupon_file:
            generate_coupon.sendCouponFIle()

        return Response(True, 202)
    else:
        return Response(False, 400)

@api_view(['POST'])
@permission_classes([AllowAny])
def couponVoting(request):
    data = request.data
    candidate_id = data["candidate_id"]
    poll_slug = data["poll_slug"]
    coupon = data["coupon"]

    coupon_exist = get_object_or_404(VotingCoupon, coupon=coupon)

    poll = get_object_or_404(Poll, slug=poll_slug)

    if coupon_exist.used == False and coupon_exist.poll == poll:
        candidate = get_object_or_404(Candidate, id=candidate_id)
        candidate.votes += 1
        candidate.save()
        coupon_exist.used = True
        coupon_exist.time_used = datetime.datetime.now()
        coupon_exist.save()

        return Response({},202)
    else:
        return Response({},403)
        