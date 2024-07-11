import cv2
import requests
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

def is_human_face(image_url):
    response = requests.get(image_url)
    image = np.array(bytearray(response.content), dtype=np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    return 'Present' if len(faces) > 0 else 'Not Present'

@app.route('/check_face', methods=['POST'])
def check_face():
    data = request.json
    image_url = data['url']
    result = is_human_face(image_url)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(port=5001)
