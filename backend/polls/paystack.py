from django.conf import settings

import requests

class Paystack():
    def __init__(self, reference):

        self.base_url = "https://api.paystack.co"
        self.secret_key = 'sk_test_7515a3e58c6c638eefbc4c375567b051b869d0fc'
        self.path = f'/transaction/verify/{reference}'

    def verifyPayment(self):
        headers={
            'Authorization':f'Bearer {self.secret_key}',
            'Content-Type':'application/json'
        }
        url = self.base_url+self.path

        response = requests.get(url,headers=headers)
        if response.status_code == 200:
            response_data = response.json()
            
            return response_data['status'],response_data['data']

        response_data = response.json()

        return response_data['status'],response_data['message']