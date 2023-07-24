import re
from django.test import TestCase
from django.core import mail
from rest_framework import status
from rest_framework.test import APITestCase
# Create your tests here.

class AccountsTestCase(APITestCase):

    register_url = "/api/register"
    verify_email_url = "/api/register/verify-email/"
    login_url = "/api/token/"

    def test_register(self):

        # register data
        data = {
            "username":"wnnns",
            "email": "wintg4@mail.com",
            "password": "Okayletmein",
            "password2": "Okayletmein",
        }
        # send POST request to "/api/register/"
        response = self.client.post(self.register_url, data)
        # check the response status and data
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        print("The response: ",response.json())
        self.assertEqual(response.json()["username"], "the_user")

        # try to login - should fail, because email is not verified
        login_data = {
            "email": data["email"],
            "password": data["password"],
        }
        response = self.client.post(self.login_url, login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.json())
        self.assertTrue('hello' in " hey hello")

        # expected one email to be send
        # parse email to get token
        self.assertEqual(len(mail.outbox), 1)
        email_lines = mail.outbox[0].body.splitlines()
        activation_line = [l for l in email_lines if "verify-email" in l][0]
        activation_link = activation_line.split("go to ")[1]
        activation_key = activation_link.split("/")[4]
        print(mail.outbox[0].body)
        print(activation_key)



