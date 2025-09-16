from flask import Flask, request, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import qrcode
import os
import uuid

app = Flask(__name__)
app.config.from_object('config.Config')
db = SQLAlchemy(app)

# Ensure QR code directory exists
os.makedirs(app.config['QR_CODE_FOLDER'], exist_ok=True)

# ========== DATABASE MODELS ==========
class Worker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    health_id = db.Column(db.String(20), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    native_language = db.Column(db.String(5), nullable=False)  # en, ml, hi, ta, te, ur
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'health_id': self.health_id,
            'full_name': self.full_name,
            'phone': self.phone,
            'native_language': self.native_language,
            'created_at': self.created_at.isoformat()
        }

class HealthRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('worker.id'), nullable=False)
    symptoms = db.Column(db.Text)  # Comma-separated symptom keys
    risk_level = db.Column(db.String(10))  # low, medium, high
    notes = db.Column(db.Text)
    visited_at = db.Column(db.DateTime, default=datetime.utcnow)

    worker = db.relationship('Worker', backref=db.backref('records', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'worker_id': self.worker_id,
            'symptoms': self.symptoms,
            'risk_level': self.risk_level,
            'notes': self.notes,
            'visited_at': self.visited_at.isoformat()
        }

# ========== API ENDPOINTS ==========
@app.route('/api/workers', methods=['POST'])
def register_worker():
    data = request.get_json()
    
    # Generate unique Health ID
    health_id = f"CM-{uuid.uuid4().hex[:6].upper()}"
    
    # Create worker
    worker = Worker(
        health_id=health_id,
        full_name=data['full_name'],
        phone=data['phone'],
        native_language=data['native_language']
    )
    
    db.session.add(worker)
    db.session.commit()
    
    # Generate QR Code
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(health_id)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    qr_path = os.path.join(app.config['QR_CODE_FOLDER'], f"{health_id}.png")
    img.save(qr_path)
    
    return jsonify({
        'success': True,
        'worker': worker.to_dict(),
        'qr_code_url': f"/qr/{health_id}.png"
    }), 201

@app.route('/api/workers/<health_id>', methods=['GET'])
def get_worker(health_id):
    worker = Worker.query.filter_by(health_id=health_id).first_or_404()
    return jsonify({
        'success': True,
        'worker': worker.to_dict()
    })

@app.route('/api/records', methods=['POST'])
def create_record():
    data = request.get_json()
    worker = Worker.query.filter_by(health_id=data['health_id']).first_or_404()
    
    record = HealthRecord(
        worker_id=worker.id,
        symptoms=data.get('symptoms', ''),
        risk_level=data.get('risk_level', 'low'),
        notes=data.get('notes', '')
    )
    
    db.session.add(record)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'record': record.to_dict()
    }), 201

@app.route('/qr/<filename>')
def serve_qr(filename):
    return send_file(os.path.join(app.config['QR_CODE_FOLDER'], filename), mimetype='image/png')

@app.route('/api/health')
def health_check():
    return jsonify({'status': 'OK', 'message': 'CodeMedics Backend Running'})

# ========== SETUP ==========
_tables_created = False

@app.before_request
def create_tables_once():
    global _tables_created
    if not _tables_created:
        db.create_all()
        _tables_created = True

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
