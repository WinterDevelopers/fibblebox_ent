import secrets

import email, smtplib, ssl
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.core.mail import EmailMessage
from django.conf import settings

from .models import VotingCoupon

class CouponGenerator():
    def __init__(self, poll_id,email, number_of_coupons):
        self.poll_id = poll_id
        self.email = email
        self.number_of_coupons = number_of_coupons

    def generateCoupons(self,length_of_coupon=6) -> list:
        #the list to store valid coupon codes
        coupon_list = []
        #if the number of coupon reaches the number of requested coupons
        while len(coupon_list) < self.number_of_coupons:
            #using secrets generate the coupon
            coupon = secrets.token_urlsafe(length_of_coupon)
            #validate if the coupon already exist
            coupon_exist = VotingCoupon.objects.filter(coupon=coupon)
            if not coupon_exist:
                a = VotingCoupon(poll=self.poll_id, coupon=coupon)
                a.save()
                coupon_list.append(coupon)
                
        return coupon_list

    def couponListToFile(self,coupon_list) -> bool:
        f = open('coupons.txt', "w")
        #loop through the list that was generated
        for coupon in coupon_list:
            #write the coupon in a new line
            f.write("%s\n" % coupon)

        f.close()
        return True

    def sendCouponFIle(self):

        """ title = "Coupon Code from Fibblebox"
        body = "Good day, the file below contains the coupons you purchased"
        sender_email = settings.EMAIL_HOST_USER
        receiver_email = self.email
        email = EmailMessage(
            title,
            body,
            sender_email,
            [receiver_email]
        )
        #attach the coupon file to the mail
        filename = 'coupons.txt'
        email.attach_file(filename)

        email.send(fail_silently=True) """

        condition = False

        subject = "An email with attachment from Fibble Box"
        body = "This is an email with attachment of your coupon codes sent from Fibblebox"
        sender_email = settings.EMAIL_HOST_USER
        password =  settings.EMAIL_HOST_PASSWORD

        # Create a multipart message and set headers
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = self.email
        message["Subject"] = subject
        #message["Bcc"] = self.email  # Recommended for mass emails

        # Add body to email
        message.attach(MIMEText(body, "plain"))

        filename = "coupons.txt"  # In same directory as script

        # Open PDF file in binary mode
        with open(filename, "rb") as attachment:
            # Add file as application/octet-stream
            # Email client can usually download this automatically as attachment
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())

        # Encode file in ASCII characters to send by email    
        encoders.encode_base64(part)

        # Add header as key/value pair to attachment part
        part.add_header(
            "Content-Disposition",
            f"attachment; filename= {filename}",
        )

        # Add attachment to message and convert message to string
        message.attach(part)
        text = message.as_string()

        # Log in to server using secure context and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, self.email, text)
            condition = True

            print('has sent the email')
        return condition
