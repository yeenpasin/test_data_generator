from faker import Faker

fake_th = Faker('th_TH')
fake = Faker()

def generate_company(settings):
    if settings == 'companyTh':
        return fake_th.company()
    elif settings == 'companyEn':
        return fake.company().replace(',', '')