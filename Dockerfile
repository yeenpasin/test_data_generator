# ใช้ base image สำหรับ Python
FROM python:3.12.4-slim

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ requirements.txt (ถ้ามี) และติดตั้ง dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# คัดลอกไฟล์ app.py และไฟล์อื่น ๆ ที่จำเป็น
COPY . .

# กำหนดพอร์ตที่แอปจะใช้
EXPOSE 5000

# คำสั่งเพื่อรันแอป
CMD ["python", "app.py"]
