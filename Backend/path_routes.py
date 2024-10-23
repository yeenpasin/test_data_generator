import os

#Base Directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Defined Directory
LOCATION_DATA = os.path.join(BASE_DIR, 'generators', 'locationData_generate')
OTHER_DATA = os.path.join(BASE_DIR, 'generators', 'otherData_generate')
PERSONAL_DATA = os.path.join(BASE_DIR, 'generators', 'personalData_generate')
DATA_STORAGE = os.path.join(BASE_DIR, 'DataStorage')

# Defined Directory file for DataStorage
DATA_JSON_PATH = os.path.join(DATA_STORAGE, 'data.json')

# Defined Directory file for locationData
ADDRESS = os.path.join(LOCATION_DATA, 'generate_address.py')
IP = os.path.join(LOCATION_DATA, 'generate_ip.py')
LOCATION = os.path.join(LOCATION_DATA, 'generate_location.py')
WAYPOINT = os.path.join(LOCATION_DATA, 'generate_waypoint.py')

# Defined Directory file for other data
COMPANY = os.path.join(PERSONAL_DATA, 'generate_company')
CURRENCY = os.path.join(PERSONAL_DATA, 'generate_currency.py')
CUSTOM_NUMBER = os.path.join(PERSONAL_DATA, 'generate_custom_number.py')
CUSTOM = os.path.join(PERSONAL_DATA, 'generate_custom.py')
FILE = os.path.join(PERSONAL_DATA, 'generate_file.py')
TEXT = os.path.join(PERSONAL_DATA, 'generate_text.py')
URL = os.path.join(PERSONAL_DATA, 'generate_url.py')

# Defined Directory file for Personal data
BANK_ACCOUNT = os.path.join(PERSONAL_DATA, 'generate_bankAccount.py')
EMAIL = os.path.join(PERSONAL_DATA, 'generate_email.py')
JOB = os.path.join(PERSONAL_DATA, 'generate_job.py')
NAME = os.path.join(PERSONAL_DATA, 'generate_name.py')
NAME_TITLE = os.path.join(PERSONAL_DATA, 'generate_nametitle.py')
PASSWORD = os.path.join(PERSONAL_DATA, 'generate_password.py')
PHONE = os.path.join(PERSONAL_DATA, 'generate_phone.py')


