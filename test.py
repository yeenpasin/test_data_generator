
# '''
# bank_pairs = {
#         'ไทยพาณิชย์': 'SCB',
#         'กรุงเทพ': 'BBL',
#         'กสิกร': 'KBANK',
#         'กรุงไทย': 'KTB',
#         'ออมสิน': 'GSB',
#         'กรุงศรี': 'BAY',
#         'ทีทีบี': 'TTB'
#     }

# print(bank_pairs)
# '''


# '''
# number = float(input('Enter your number: '))  # แปลงข้อมูลจาก input เป็น float
# rounded_number = round(number, 2)  # รอบจำนวนทศนิยม 2 ตำแหน่ง
# print(rounded_number)  # ปริ้นค่าที่รอบแล้ว
# '''


# from geopy.distance import distance

# # พิกัดแรก (ละติจูด, ลองจิจูด)
# coord1 = (13.7563, 100.5018)  # กรุงเทพ

# # พิกัดที่สอง (ละติจูด, ลองจิจูด)
# coord2 = (18.7883, 98.9863)  # เชียงใหม่

# # คำนวณระยะทาง
# dist = distance(coord1, coord2).kilometers

# print(f"ระยะทางระหว่างกรุงเทพและเชียงใหม่คือ {dist:.2f} กิโลเมตร")


from faker import Faker

fake = Faker()
fake_th = Faker('th_TH')

name = fake.name()
nameTH = fake_th.name()

print(name) # จำลองข้อมูลชื่อ - นามสกุล (ภาษาอังกฤษ)
print(nameTH) # จำลองข้อมูลชื่อ - นามสกุล (ภาษาไทย)

# # Format the output as UYU (Uruguayan peso)
# formatted_currency = f"{currency_info[0]} ({currency_info[1]})"
# print(formatted_currency)









