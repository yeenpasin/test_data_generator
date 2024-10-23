from faker import Faker

fake_eng = Faker('en_GB')
fake_th = Faker('th_TH')

def generate_address(settings):

    if settings == 'AddressTh':
        return fake_th.address()
    elif settings == 'AddressEn':
        return fake_eng.address().replace('\n', ' ')