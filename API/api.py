from flask import Blueprint, request, jsonify
from Backend.data_generator import generate_data, format_data

# สร้าง Blueprint ชื่อ api
api = Blueprint('api', __name__)

# API สำหรับการสร้างข้อมูล
@api.route('/generate', methods=['POST'])
def generate():
    data = request.json
    num_records = int(data['num_records'])
    file_format = data['format']
    delimiter = data['delimiter']
    
    rows = data['rows']
    data_types = [row['data_type'] for row in rows]
    field_names = [row['field_name'] for row in rows]
    settings_list = [row['settings'] for row in rows]
    include_list = [row['include'] for row in rows]
    exclude_list = [row['exclude'] for row in rows]
    only_list = [row['only'] for row in rows]
    decimal_list = [row['decimal'] for row in rows]
    name_lengthMax_list = [row['name_lengthMax'] for row in rows]
    fix_namelength_list = [row['fix_namelength'] for row in rows]
    firstLatLon_list = [row['firstLatLon'] for row in rows]
    secLatLon_list = [row['secLatLon'] for row in rows]
    
    data = generate_data(num_records, data_types, field_names, settings_list, include_list, exclude_list, only_list, decimal_list, name_lengthMax_list, fix_namelength_list, firstLatLon_list, secLatLon_list)
    formatted_data = format_data(data, file_format, delimiter)
    
    # ตรวจสอบว่าถ้า formatted_data เป็น bytes, ให้แปลงเป็น string ก่อน
    if isinstance(formatted_data, bytes):
        formatted_data = formatted_data.decode('utf-8')
    
    # ส่งข้อมูลกลับในรูปแบบ JSON
    return jsonify({'data': formatted_data})
