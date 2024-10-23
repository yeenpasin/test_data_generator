from faker import Faker
import random

fake = Faker()


def generate_password(pattern):
    return ''.join(random.choice('abcdefghijklmnopqrstuvwxyz') if char == '@' else str(fake.random_int(min=0, max=9)) if char == '#' else char for char in pattern)