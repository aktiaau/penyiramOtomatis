from app import db, User, app
from werkzeug.security import generate_password_hash

username = "upskill"
password = generate_password_hash("upskill")  # Enkripsi password

# Pastikan berada dalam application context sebelum berinteraksi dengan database
with app.app_context():
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

print("User berhasil ditambahkan!")
