from faker import Faker
import random

fake = Faker()
fake_th = Faker('th_TH')

def generate_name(settings, name_lengthMax, fix_namelength):
    name_lengthMax = int(name_lengthMax) if name_lengthMax else None
    fix_namelength = int(fix_namelength) if fix_namelength else None

    match settings:
        case 'FullName':
            name = generate_name_without_prefix()
        case 'FirstName':
            name = fake.first_name()
        case 'LastName':
            name = fake.last_name()
        case 'ThaiFull':
            name = fake_th.name()
        case 'ThaiFirst':
            name = fake_th.first_name()
        case 'ThaiLast':
            name = fake_th.last_name()
        case _:
            return "Invalid settings"
    
    name = adjust_name_lengthMax(name, name_lengthMax)
    name = adjust_fix_name_length(name, fix_namelength, settings)

    return name


# ทำให้การ fullname ไม่ต้อง generate คำนำหน้าชื่ออกมา
def generate_name_without_prefix():
    full_name = fake.name()
    # แยกชื่อออกเป็นคำๆ
    parts = full_name.split()
    # ตรวจสอบและลบคำนำหน้าชื่อที่เป็นคำแรก
    if parts[0] in ['Dr.', 'Mr.', 'Mrs.', 'Ms.', 'Jr.']:
        parts.pop(0)
    # รวมชื่อที่เหลือกลับมาเป็นชื่อเต็ม
    return ' '.join(parts)


def adjust_name_lengthMax(name, name_lengthMax):
    if not name_lengthMax:
        return name

    result = []
    count = 0
    for char in name:
        if char != " ":
            count += 1
        if count > name_lengthMax:
            break
        result.append(char)
        
    return ''.join(result)

def adjust_fix_name_length(name, fix_namelength, settings):
    if not fix_namelength:
        return name

    if 'Thai' in settings:
        # filler = 'ก'
        fill_chars = [chr(i) for i in range(ord('ก'), ord('ฮ') + 1)]
    else:
        # filler = 'a'
        fill_chars = [chr(i) for i in range(ord('a'), ord('z') + 1)]

    name_no_spaces = name.replace(" ", "")
    while len(name_no_spaces) < fix_namelength:
        name_no_spaces += random.choice(fill_chars)

    result = []
    no_space_count = 0
    for char in name:
        if char != " ":
            no_space_count += 1
        result.append(char)
        if no_space_count >= fix_namelength:
            break
    
    while no_space_count < fix_namelength:
        result.append(random.choice(fill_chars))
        no_space_count += 1

    return ''.join(result)