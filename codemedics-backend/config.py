import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://codemedics_user:codemedics_pass@localhost/codemedics_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    QR_CODE_FOLDER = os.path.join(os.getcwd(), 'static', 'qr_codes')
