import random

otp_storage = {}

temp_users = {}


def generate_otp(email):

    otp = str(random.randint(100000, 999999))

    otp_storage[email] = otp

    return otp


def verify_otp(email, otp):

    return otp_storage.get(email) == otp