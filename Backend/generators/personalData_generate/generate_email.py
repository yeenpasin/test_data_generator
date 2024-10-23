from faker import Faker

fake = Faker()

def generate_email(settings):
    domain_settings = [opt.strip() for opt in settings.split(',')]
    domain = fake.random_element(domain_settings)
    return fake.email(domain=domain)