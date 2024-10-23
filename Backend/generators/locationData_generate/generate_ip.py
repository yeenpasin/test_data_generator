from faker import Faker

fake = Faker()

def generate_ip(settings):
    if settings == 'ipv4':
        return fake.ipv4()
    elif settings == 'ipv6':
        return fake.ipv6()