from django.contrib import admin
from .models import Poll,Candidate,Office,EmailPayment,VotingCoupon,CouponPayment,PollPayment

class PollFormat(admin.ModelAdmin):
    list_display=('name','date')
    prepopulated_fields={'slug':['name',]}
class CandidateFormat(admin.ModelAdmin):
    list_display=('name','votes','poll')
    prepopulated_fields={'slug':('name','poll')}

class EmailVotingFormat(admin.ModelAdmin):
    list_display=('amount','candidate','reference','transaction_status')
    search_fields = ['reference', 'amount']

class CouponPaymentFormat(admin.ModelAdmin):
    list_display=('number_of_coupons','amount', 'poll','verification')
    search_fields=['reference','amount']

class VotingCouponFormat(admin.ModelAdmin):
    list_display = ("coupon","poll","used")
    search_fields = ['coupon','poll']

class PollPaymentFormat(admin.ModelAdmin):
    list_display = ("amount","reference","verification")
    search_fields = ['amount','reference']

# Register your models here.
admin.site.register(Poll, PollFormat)
admin.site.register(Candidate,CandidateFormat)
admin.site.register(Office)
admin.site.register(EmailPayment,EmailVotingFormat)
admin.site.register(VotingCoupon,VotingCouponFormat)
admin.site.register(CouponPayment,CouponPaymentFormat)
admin.site.register(PollPayment, PollPaymentFormat)