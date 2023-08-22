from django.contrib import admin
from .models import Poll,Candidate,Office,EmailPayment,VotingCoupon

class CandidateFormat(admin.ModelAdmin):
    list_display=('name','votes','poll')
    prepopulated_fields={'slug':('name','poll')}

class EmailVotingFormat(admin.ModelAdmin):
    list_display=('amount','candidate','reference','transaction_status')
    search_fields = ['reference', 'amount']

# Register your models here.
admin.site.register(Poll)
admin.site.register(Candidate,CandidateFormat)
admin.site.register(Office)
admin.site.register(EmailPayment,EmailVotingFormat)
admin.site.register(VotingCoupon)