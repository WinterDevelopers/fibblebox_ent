import six
from django.contrib.auth.tokens import PasswordResetTokenGenerator

class ActivateAccountTokenGen(PasswordResetTokenGenerator):

    def make_hash_value(self, user, timestamp):
        return(six.text_type(user.pk)+six.text_type(timestamp)+six.text_type(user.is_active))


activate_account_token = ActivateAccountTokenGen()