import random
import secrets

from .models import VotingCoupon

class CouponGenerator():

    def generateCoupons(self, number_of_coupons, length_of_coupon=6):
        coupon_list = []
        while len(coupon_list) < number_of_coupons:
            coupon = secrets.token_urlsafe(length_of_coupon)
            coupon_exist = VotingCoupon.objects.filter(coupon=coupon)
            if not coupon_exist:
                coupon_list.append(coupon)
                
        return coupon_list



    """ char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV1234567890`-=~!@#$%^&*()_+?"
    def generator(self, numbers_of_coupons):
        length_of_coupon = 9
        coupon_codes = []
        for x in range(0,number_of_coupons):
            coupon = ""

            for x in range(0,length_of_coupon):
                coupon += random.choice(self.char)
            coupon_codes.append(coupon)
        
        print(coupon_codes)
 """


