from flask import Flask, flash, session, render_template, request, redirect, url_for
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Pastikan ini rahasia
DATABASE = 'users.db'


# Fungsi koneksi database
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Mengembalikan hasil dalam bentuk dictionary
    return conn


# Fungsi untuk membuat tabel jika belum ada
def create_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def add_user(username, password):
    hashed_password = generate_password_hash(password)
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)',
                   (username, hashed_password))
    conn.commit()
    conn.close()

# Tambah user baru (ganti username dan password sesuai keinginan)
add_user("vedc", "vedc")

# Route index
@app.route('/')
def index():
    return redirect(url_for('login'))


# Route login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        conn.close()

        # Debugging
        print("==== DEBUG LOGIN ====")
        if user:
            print(f"User ditemukan: {user['username']}")
            print(f"Password Hash di DB: {user['password']}")

            if check_password_hash(user['password'], password):
                session['username'] = username
                print(f"Login sukses! Session disimpan: {session['username']}")
                flash('Login successful!', 'success')
                return redirect(url_for('dashboard'))
            else:
                print("Password salah!")
                flash('Password salah!', 'danger')
        else:
            print("Username tidak ditemukan!")
            flash('Username tidak ditemukan!', 'danger')

    return render_template('login.html')


# Route dashboard
@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        print(f"User {session['username']} berhasil masuk ke dashboard")  # Debugging
        return render_template('dashboard.html', username=session['username'])

    flash('Silakan login terlebih dahulu.', 'warning')
    return redirect(url_for('login'))


# Route logout
@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('Anda telah logout.', 'info')
    return redirect(url_for('login'))

@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/developer')
def developer():
    return render_template('developer.html')

if __name__ == '__main__':
    create_table()  # Buat tabel saat pertama kali dijalankan
    app.run(debug=True)
