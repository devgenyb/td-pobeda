import json

import flask
from flask import Flask, request
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv


dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

app = Flask(__name__)

# FRONT_URL = os.getenv('FRONT_URL')
# CORS(app, resources={r"/*": {"origins": os.getenv('FRONT_URL')}})
# CORS(app)


app.config['MAIL_SERVER'] = os.getenv('YANDEX_SMTP')
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)


@app.route('/feedback', methods=["POST"])
def feedback_form():
    resp = {"status": 200}
    [name, email, phone] = request.json.values()
    text = f"Вам поступила новая заявка от {name}. Электронная почта: {email}; Номер телефона: {phone};"
    msg = Message('Форма обратной связи', sender='bbevgenydd@yandex.ru', recipients=['bbevgenydd@yandex.ru'])
    msg.body = text
    mail.send(msg)
    return flask.Response(json.dumps(resp))


@app.route('/', methods=["GET"])
def index():
    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run()
