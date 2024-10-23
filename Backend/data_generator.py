from faker import Faker
import json
import csv
import io
from generators.personalData_generate.generate_name import generate_name
from generators.personalData_generate.generate_phone import generate_phone_number
from generators.personalData_generate.generate_email import generate_email
from generators.personalData_generate.generate_password import generate_password
from generators.personalData_generate.generate_job import generate_job
from generators.personalData_generate.generate_bankAccount import generate_bankAccount
from generators.personalData_generate.generate_nametitle import generate_nametitle

from generators.locationData_generate.generate_location import *
from generators.locationData_generate.generate_waypoint import generate_waypoint
from generators.locationData_generate.generate_address import generate_address
from generators.locationData_generate.generate_ip import generate_ip

from generators.otherData_generate.generate_company import generate_company
from generators.otherData_generate.generate_custom import generate_custom
from generators.otherData_generate.generate_custom_number import generate_custom_number
from generators.otherData_generate.generate_url import generate_url
from generators.otherData_generate.generate_file import generate_file
from generators.otherData_generate.generate_currency import generate_currency
from generators.otherData_generate.generate_text import generate_text

fake = Faker()
fake_eng = Faker('en_GB')
fake_th = Faker('th_TH')
fake_jp = Faker('ja_JP')


def generate_data(num_records, data_types, field_names, settings_list, include_list, exclude_list, only_list, decimal_list, name_lengthMax_list,fix_namelength_list, firstLatLon_list, secLatLon_list):
    data = []
  
    default_values = {}

    for _ in range(num_records):
        record = {}
        for i, (data_type, field_name, settings, include, exclude, only, decimal_places, name_lengthMax, fix_namelength) in enumerate(zip(
                data_types, field_names, settings_list, include_list, exclude_list, only_list, decimal_list, name_lengthMax_list, fix_namelength_list)):
            
            if data_type == 'Location':
                location_data = generate_location(settings, field_name)
                if isinstance(location_data, dict):
                    record.update(location_data)
                else:
                    record[field_name] = location_data
           
            else:
                record[field_name] = generate_field(data_type, field_name, settings, include, exclude, only, decimal_places, name_lengthMax,fix_namelength, default_values, firstLatLon_list[i], secLatLon_list[i])
        
        data.append(record)
        
    return data

def generate_field(data_type, field_name, settings, include, exclude, only, decimal_places, name_lengthMax,fix_namelength ,default_values,firstLatLon,secLatLon):
    match data_type:
        case 'Name':
            return generate_name(settings, name_lengthMax , fix_namelength)
        case 'Phone':
            return generate_phone_number(settings)
        case 'Email':
            return generate_email(settings)
        case 'Username':
            return fake.user_name()
        case 'password':
            return generate_password(settings)
        case 'IDcard':
            return fake_th.ssn()
        case 'nameTitle':
            return generate_nametitle(settings, include, exclude, only)
        case 'job':
            return generate_job(settings)
        case 'dateOfbirth':
            return str(fake.date_of_birth())
        case 'bankAccount':
            return generate_bankAccount(settings)
        case 'Location':
            return generate_location(settings,field_name)
        case 'wayPoint':
            return generate_waypoint(int(settings), firstLatLon, secLatLon)
        case 'country':
            return fake.country()
        case 'Address':
            return generate_address(settings)
        case 'IPAddress':
            return generate_ip(settings)
        case 'postcode':
            return fake.postcode()
        case 'company':
            return generate_company(settings)
        case 'custom':
            return generate_custom(settings)
        case 'customNumber':
            return generate_custom_number(field_name, settings, default_values, decimal_places)
        case 'color':
            return fake.color()
        case 'url':
            return generate_url(settings)
        case 'file':
            return generate_file(settings)
        case 'currency':
            return generate_currency(settings)
        case 'text':
            return generate_text(settings)
        case _:
            return "Invalid data type requested"


def format_data(data, file_format, delimiter=','):
    if file_format == 'json':
        return json.dumps(data, ensure_ascii=False, indent=4)
    elif file_format == 'csv':
        csv_data = io.StringIO()
        csv_data.write('\ufeff')
        delimiter = "\t" if delimiter == "tab" else delimiter
        writer = csv.DictWriter(csv_data, fieldnames=data[0].keys(), delimiter=delimiter)
        writer.writeheader()
        writer.writerows(data)
        return csv_data.getvalue().encode('utf-8-sig')
    elif file_format == 'txt':
        txt_data = io.StringIO()
        for item in data:
            txt_data.write(", ".join(str(v) for v in item.values()) + "\n")
        return txt_data.getvalue()
    else:
        return "Invalid format requested"