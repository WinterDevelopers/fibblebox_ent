from django.db import models
from django.urls import reverse

from .paystack import Paystack

import secrets

# Create your models here.

VOTE_COSTS = ((50,"50"),(100,"100"),(200,"200"),(500,"500"),(1000,"1000"))

class Poll(models.Model):
    name = models.CharField(max_length=250,default="default text")
    slug = models.SlugField(max_length=250, unique=True)
    poll_image = models.ImageField(upload_to = 'poll')
    poll_info = models.TextField(max_length=3000, null=True)
    date = models.DateField()
    location = models.CharField(max_length=50,default="default text")
    cost = models.PositiveIntegerField(choices=VOTE_COSTS,default="100")
    count_down = models.DateTimeField()

    class Meta:
        ordering = ['-id']

    @property
    def total_votes(self):
        candidate_vote = self.poll_candidate.all()
        poll_votes = sum([vote.votes for vote in candidate_vote])

        return poll_votes

    @property
    def pollImage(self):
        try:    
            url = self.pageantry_image.url
        except:
            url = ''
        return url


    def get_absolute_url(self):

        return reverse('poll:polls', kwargs={'slug':str(self.slug)})

    def __str__(self) -> str:
        return self.name

class Office(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.SET_NULL, related_name='poll_office', null=True)
    office_name = models.CharField(max_length=200)

    @property
    def office_total_votes(self):
        votes = self.candidate_office.all()
        
        office_votes = sum([x.votes for x in votes])
        
        return office_votes


    def __str__(self) -> str:
        return str(self.poll)+' office:'+str(self.office_name)

class Candidate(models.Model):
    poll =  models.ForeignKey(Poll, on_delete=models.SET_NULL, related_name='poll_candidate', null=True)
    office = models.ForeignKey(Office, on_delete=models.SET_NULL, related_name='candidate_office', null=True)
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, null=True)
    quote = models.CharField(max_length=250)
    personal_image = models.ImageField(upload_to = 'candidates')
    votes = models.PositiveIntegerField(default=0)

    @property
    def personal_image_URL(self):
        try:
            image = self.personal_image.url
        except:
            image = ''
        return image
    
    #@property
    #def percentage_votes(self):
        total_votes = sum([vote  for vote in range(0,self.votes - 1)])
        return total_votes  

    @property
    def office_name(self):
        return str(self.office)


    """ def get_absolute_url(self):

        return reverse('Poll:candidate', kwargs={'id':str(self.id)}) """


    def __str__(self):
        return self.name


class EmailPayment(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.SET_NULL, null=True)
    votes = models.PositiveIntegerField()
    amount = models.PositiveIntegerField(null=True)
    email = models.EmailField(null=True)
    transaction_status  = models.BooleanField(default=False)
    date_of_transaction = models.DateTimeField(auto_now_add=True)
    reference = models.CharField(max_length=300, null=True)

    class Meta:
        ordering =['-date_of_transaction']

    def save(self, *args, **kwargs) ->None:
        if not self.amount:
            cost = int(self.candidate.poll.cost)
            votes = int(self.votes)
            self.amount = (cost * votes)

        while not self.reference:
            reference = secrets.token_urlsafe(30)
            similar_token  = EmailPayment.objects.filter(reference=reference)
            if not similar_token:
                self.reference = reference

        super().save(*args, **kwargs)

    def amount_value(self) ->int:
        amount = self.amount * 100
        return amount

    def verified_payment(self) -> bool:
        if self.transaction_status == False:

            paystack = Paystack(self.reference)
            status, result = paystack.verifyPayment()
            
            if status:
                if result['amount']/100 == self.amount:
                    if (result['amount']/100) / int(self.candidate.poll.cost) == self.votes: self.transaction_status = True
             
                self.save()

            if self.transaction_status:
                return True
            else:
                return False
        return False

    def __str__(self) -> str:
        return f"payment of:{self.amount} for {self.candidate}"


class VotingCoupon(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.SET_NULL, related_name='poll_coupon', null=True)
    coupon = models.CharField(max_length=30)
    used = models.BooleanField(default=False)
    time_used = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.coupon)


class CouponPayment(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.SET_NULL, related_name='poll_coupon_payment', null=True)
    number_of_coupons = models.PositiveIntegerField(null=True)
    email = models.EmailField(null=True)
    amount = models.PositiveIntegerField(null=True)
    reference = models.CharField(max_length=200,null=True)
    verification = models.BooleanField(default=False)

    class Meta:
        ordering =['-id']

    def save(self, *args, **kwargs)->None:
        self.amount = self.number_of_coupons * self.poll.cost
        while not self.reference:
            reference = secrets.token_urlsafe(40)
            similiar_ref = CouponPayment.objects.filter(reference=reference)
            if not similiar_ref :
                self.reference = reference
        super().save(*args, **kwargs)

    def amount_value(self) ->int:
        amount = self.number_of_coupons * self.poll.cost
        return amount

    def verified_payment(self) -> bool:
        if self.verification == False:
            paystack = Paystack(self.reference)
            status, result = paystack.verifyPayment()
            
            if status:
                if result['amount']/100 == self.amount:
                    self.verification = True
                self.save()
            if self.verification:
                return True
            else:
                return False
        else:
            return False

    def __str__(self):
        return str(self.amount)



"""
class pageantrySponsor(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, null=True, related_name="poll_sponsor")
    name = models.CharField(max_length=30)
    image = models.ImageField(upload_to='sponsors')

    @property
    def imageURL(self):
        try:
            image = self.image.url
        except:
            image = ''
        return image

    def __str__(self) -> str:
        return self.name """