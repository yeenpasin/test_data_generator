from faker import Faker

fake = Faker()
fake_th = Faker('th_TH')

def generate_text(settings):
    if settings == 'textTh':
        return fake_th.paragraph()
    elif settings == 'textEn':
        return fake.paragraph()