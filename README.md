# เครื่องมือสร้างชุดข้อมูลสำหรับการทดสอบ (Generate Test Data)

# library 
- flask 3.0.3
- Faker 26.0.0
- geopy 2.4.1

# feture 
- สามารถสร้างข้อมูลประเภท Personal Data , Location Data , Other Data
- สามารถกำหนดจำนวนชุดข้อมูลได้ (Number of records)
- รองรับการ generate และ export ข้อมูลในรูปแบบ JSON , CSV และ TXT
- รองรับการ generate ข้อมูล ภาษาไทย และ ภาษาอังกฤษ รวมไปถึงรูปแบบ อื่นๆ

# วิธีรันโปรเจค
- รันผ่าน file app.py โดยใช้คำสั่ง py app.py ใน terminal

### โครงสร้างไฟล์ 
- API folder 
    - api.py สำหรับรับข้อมูลที่ได้มาเมื่อผู้ใช้กดปุ่ม generate จาก frontend


- Backend (folder) 
    - DataStorage (folder)
        - data.json ไฟล์สำหรับเก็บ data ที่ใช้ในการ generate 

    - generators (folder)
        - locationData_generate (folder) โฟลเดอร์สำหรับไฟล์การ generate ข้อมูลประเภท LocationData
        - otherData_generate (folder) โฟลเดอร์สำหรับไฟล์การ generate ข้อมูลประเภท OtherData
        - personalData_generate (folder) โฟลเดอร์สำหรับไฟล์การ generate ข้อมูลประเภท PersonalData

    - app.py คือไฟล์หลักของโปรเจค

    - data_generator.py เป็นไฟล์สำหรับจัดการ generate โดย file นี้จะมีการเรียกใช้งาน method ของ datatype ที่เราต้องการ generate อื่นๆ ใน folder  locationData_generate , otherData_generate , personalData_generate

    - path_routes.py คือไฟล์ที่มีไว้สำหรับจัดการเส้นทาง เพื่อให้การอ้างอิง path ง่ายขึ้น



- Frontend (folder)

    - static (folder)
        - css (folder)
            - style.css คือไฟล์สำหรับตกแต่ง UI
        - js (folder)
            - script.js คือไฟล์สำหรับจัดการการทำงาน frontend เช่น การกดปุ่ม

    templates (folder)
        - index.html คือไฟล์สำหรับจัดการโครงสร้างของหน้า web

        
# วิธีการใช้งานปุ่ม save template และ open file
- save template คือ ปุ่มที่เราสามารถ download โครงสร้างข้อมูลที่เราได้มีการเลือกไว้มาเป็นไฟล์ json 
และนำกลับมาใช้ใหม่ได้ด้วยการ open file

- open file คือ ปุ่มที่เราสามารถนำไฟล์ที่ได้จากการ save template มาใช้ใหม่ได้ 
(ไฟล์ที่จะนำมาใช้ในการ open file ต้องได้มาจากการ download ผ่านตัว save template เท่านั้น)


