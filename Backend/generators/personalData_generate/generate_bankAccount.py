import random
import json
from faker import Faker
from path_routes import DATA_JSON_PATH

fake_th = Faker('th_TH')

with open(DATA_JSON_PATH, 'r', encoding='utf-8') as file:
    data = json.load(file)

bank_pairs = data["bank_pairs"]

def generate_bankAccount(settings):
    
    match settings:
        case 'bankName':
            return f'{random.choice(list(bank_pairs.keys()))} ({random.choice(list(bank_pairs.values()))})'
        case 'bankNameTh':
            return random.choice(list(bank_pairs.keys()))
        case 'bankNameEn':
            return random.choice(list(bank_pairs.values()))
        case 'bankNumber':
            return fake_th.bban()
        case _:
            return "Invalid settings"