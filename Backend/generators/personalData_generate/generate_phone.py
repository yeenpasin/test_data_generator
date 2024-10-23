from faker import Faker

fake = Faker()

def generate_phone_number(pattern):
    return ''.join(str(fake.random_int(min=0, max=9)) if char == '#' else char for char in pattern)