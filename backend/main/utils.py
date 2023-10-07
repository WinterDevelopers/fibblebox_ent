import email, smtplib, ssl
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from django.conf import settings


from main.token import activate_account_token

class SendActivationEmail():

    def __init__(self, user, email) -> None:
        self.user = user
        self.email = email

    def sendEmail(self) -> bool:
        response_status = False

        #Email basic data required 
        subject = "An email to help you activate your account"
        body = render_to_string("activate_email.html",{
            'name':self.user.username,
            "domain":settings.WEBAPP_DOMAIN,
            'uid':urlsafe_base64_encode(force_bytes(self.user.pk)),
            'token':activate_account_token.make_token(self.user),
            'Protocol':'https',
        })

        #email authentication details
        sender_email = settings.EMAIL_HOST_USER
        password =  settings.EMAIL_HOST_PASSWORD

        # Create a multipart message and set headers
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = self.email
        message["Subject"] = subject
        #add body to the message
        message.attach(MIMEText(body,"plain"))

        # Add attachment to message and convert message to string
        text = message.as_string()

        # Log in to server using secure context and send email
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)

            server.sendmail(sender_email, self.email, text)
            response_status = True

            return response_status
        return response_status

class SendForgottenPasswordMail():
    def __init__(self, email,user) -> None:
        self.email = email
        self.user = user

    def sendEmail(self) -> bool:
        response_status = False
        #email authentication details
        sender_email = settings.EMAIL_HOST_USER
        password =  settings.EMAIL_HOST_PASSWORD

        subject = "Password reset from ************"

        # Create a multipart message and set headers
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = self.email
        message["Subject"] = subject

        body = render_to_string("forgotten_pass_email.html",{
            'name':self.user.username,
            "domain":settings.WEBAPP_DOMAIN,
            'uid':urlsafe_base64_encode(force_bytes(self.user.pk)),
            'token':activate_account_token.make_token(self.user),
            'Protocol':'https',
        })
        #add body to the message
        message.attach(MIMEText(body,"plain"))
        #convert the message to string for transmission 
        text = message.as_string()
        # create SSL  to send the mail
        context = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        # Log in to server using secure context and send email
            server.login(sender_email, password)
           
            server.sendmail(sender_email, self.email, text)
            response_status = True

            return response_status

        return response_status
