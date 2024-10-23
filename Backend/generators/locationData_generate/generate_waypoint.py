import random
from geopy.distance import distance

def generate_waypoint(settings, firstLatLon, secLatLon):

    waypoints = []

    # ตรวจสอบว่า firstLatLon และ secLatLon ไม่ใช่สตริงว่าง
    if not firstLatLon or not secLatLon:
        # ถ้าเป็นสตริงว่าง ให้สุ่มค่าเริ่มต้นและค่าสุดท้าย
        firstLat, firstLon = random.uniform(-90, 90), random.uniform(-180, 180)
        secLat, secLon = random.uniform(-90, 90), random.uniform(-180, 180)
    else:
        # ถ้าไม่ใช่สตริงว่าง ให้แปลงค่าตามปกติ
        firstLat, firstLon = map(float, firstLatLon.split(','))
        secLat, secLon = map(float, secLatLon.split(','))

    # ตรวจสอบว่าค่าพิกัดแรกและสุดท้ายถูกต้อง
    if firstLat > secLat: firstLat, secLat = secLat, firstLat
    if firstLon > secLon: firstLon, secLon = secLon, firstLon

    # สุ่มพิกัดเริ่มต้นให้อยู่ระหว่าง firstLatLon และ secLatLon
    start_lat = random.uniform(firstLat, secLat)
    start_lon = random.uniform(firstLon, secLon)

    current_lat, current_lon = start_lat, start_lon
    waypoints.append(f"{round(current_lat, 6)}, {round(current_lon, 6)}")

    #วนลูปเพื่อสุ่มพิกัดใหม่จนกว่าจะครบจำนวน setting หรือ numwaypoint ที่ผู้ใช้กำหนด
    while len(waypoints) < int(settings):
        # กำหนดระยะทางสุ่มในช่วง 0 ถึง 5 กิโลเมตร
        radius = random.uniform(0, 5)
        
        # สุ่มมุมทิศทาง
        bearing = random.uniform(0, 360)
    
        # คำนวณตำแหน่งใหม่
        new_location = distance(kilometers=radius).destination((current_lat, current_lon), bearing)
        current_lat, current_lon = new_location.latitude, new_location.longitude

        # ตรวจสอบว่าพิกัดใหม่อยู่ในช่วงระหว่าง firstLatLon และ secLatLon หรือไม่
        if (firstLat <= current_lat <= secLat) and (firstLon <= current_lon <= secLon):
            waypoints.append(f"{round(current_lat, 6)}, {round(current_lon, 6)}")
        # ถ้าไม่อยู่ในช่วง ให้สุ่มพิกัดใหม่อีกครั้งจากตำแหน่งเริ่มต้น
        else:
            current_lat, current_lon = start_lat, start_lon

    return waypoints