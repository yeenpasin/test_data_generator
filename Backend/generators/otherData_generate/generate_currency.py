from faker import Faker

fake = Faker()

def generate_currency(settings):
    if settings == 'curName':
        return fake.currency_name()
    elif settings == 'curSymbol':
        return fake.currency_symbol()