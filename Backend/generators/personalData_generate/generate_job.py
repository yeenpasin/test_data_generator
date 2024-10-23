from faker import Faker

fake = Faker()
fake_th = Faker('th_TH')

def generate_job(settings):
    match settings:
        case 'jobTh':
            return fake_th.job()
        case 'jobEn':
            return fake.job().replace(',', '')
        case _:
            return "Invalid settings"