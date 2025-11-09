from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import json
from datetime import datetime
import os

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    # Students table
    c.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            matric_number TEXT UNIQUE NOT NULL,
            department TEXT NOT NULL,
            level TEXT NOT NULL,
            email TEXT,
            phone TEXT,
            total_marks INTEGER DEFAULT 0,
            attendance_count INTEGER DEFAULT 0,
            registered_at TEXT NOT NULL,
            last_updated TEXT NOT NULL
        )
    ''')
    
    # Attendance records table
    c.execute('''
        CREATE TABLE IF NOT EXISTS attendance_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            matric_number TEXT NOT NULL,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            marks_earned INTEGER DEFAULT 1,
            FOREIGN KEY (matric_number) REFERENCES students (matric_number)
        )
    ''')
    
    # Create indexes for better performance
    c.execute('CREATE INDEX IF NOT EXISTS idx_matric_number ON students (matric_number)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records (date)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_attendance_matric ON attendance_records (matric_number)')
    
    conn.commit()
    conn.close()

@app.route('/')
def serve_frontend():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory('.', path)

# ==================== STUDENT MANAGEMENT API ====================

@app.route('/api/students', methods=['GET', 'POST'])
def handle_students():
    if request.method == 'GET':
        return get_all_students()
    elif request.method == 'POST':
        return register_student()

def get_all_students():
    """Get all registered students"""
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    c.execute('''
        SELECT id, name, matric_number, department, level, email, phone, 
               total_marks, attendance_count, registered_at, last_updated
        FROM students 
        ORDER BY name
    ''')
    
    records = c.fetchall()
    conn.close()
    
    students = []
    for record in records:
        students.append({
            'id': record[0],
            'name': record[1],
            'matricNumber': record[2],
            'department': record[3],
            'level': record[4],
            'email': record[5],
            'phone': record[6],
            'totalMarks': record[7],
            'attendanceCount': record[8],
            'registeredAt': record[9],
            'lastUpdated': record[10]
        })
    
    return jsonify(students)

def register_student():
    """Register a new student"""
    data = request.json
    
    required_fields = ['name', 'matricNumber', 'department', 'level']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'success': False, 'error': f'Missing required field: {field}'}), 400
    
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    try:
        # Check if student already exists
        c.execute('SELECT id FROM students WHERE matric_number = ?', (data['matricNumber'],))
        existing = c.fetchone()
        
        if existing:
            return jsonify({'success': False, 'error': 'Student with this matric number already exists'}), 400
        
        # Insert new student
        current_time = datetime.now().isoformat()
        c.execute('''
            INSERT INTO students 
            (id, name, matric_number, department, level, email, phone, registered_at, last_updated)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('id', f"STU_{datetime.now().timestamp()}"),
            data['name'],
            data['matricNumber'],
            data['department'],
            data['level'],
            data.get('email', ''),
            data.get('phone', ''),
            current_time,
            current_time
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True, 
            'message': 'Student registered successfully',
            'studentId': data['matricNumber']
        })
        
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/students/<matric_number>', methods=['GET', 'PUT', 'DELETE'])
def handle_student(matric_number):
    if request.method == 'GET':
        return get_student_details(matric_number)
    elif request.method == 'PUT':
        return update_student(matric_number)
    elif request.method == 'DELETE':
        return delete_student(matric_number)

def get_student_details(matric_number):
    """Get detailed information about a specific student"""
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    # Get student basic info
    c.execute('''
        SELECT id, name, matric_number, department, level, email, phone, 
               total_marks, attendance_count, registered_at
        FROM students 
        WHERE matric_number = ?
    ''', (matric_number,))
    
    student_record = c.fetchone()
    if not student_record:
        conn.close()
        return jsonify({'success': False, 'error': 'Student not found'}), 404
    
    # Get attendance history
    c.execute('''
        SELECT date, timestamp, marks_earned 
        FROM attendance_records 
        WHERE matric_number = ? 
        ORDER BY timestamp DESC
    ''', (matric_number,))
    
    attendance_records = c.fetchall()
    conn.close()
    
    student = {
        'id': student_record[0],
        'name': student_record[1],
        'matricNumber': student_record[2],
        'department': student_record[3],
        'level': student_record[4],
        'email': student_record[5],
        'phone': student_record[6],
        'totalMarks': student_record[7],
        'attendanceCount': student_record[8],
        'registeredAt': student_record[9],
        'attendanceHistory': [
            {
                'date': record[0],
                'timestamp': record[1],
                'marksEarned': record[2]
            } for record in attendance_records
        ]
    }
    
    return jsonify(student)

def update_student(matric_number):
    """Update student information"""
    data = request.json
    
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    try:
        # Check if student exists
        c.execute('SELECT id FROM students WHERE matric_number = ?', (matric_number,))
        if not c.fetchone():
            conn.close()
            return jsonify({'success': False, 'error': 'Student not found'}), 404
        
        # Update student
        c.execute('''
            UPDATE students 
            SET name = ?, department = ?, level = ?, email = ?, phone = ?, last_updated = ?
            WHERE matric_number = ?
        ''', (
            data.get('name', ''),
            data.get('department', ''),
            data.get('level', ''),
            data.get('email', ''),
            data.get('phone', ''),
            datetime.now().isoformat(),
            matric_number
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Student updated successfully'})
        
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({'success': False, 'error': str(e)}), 500

def delete_student(matric_number):
    """Delete a student and their attendance records"""
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    try:
        # Check if student exists
        c.execute('SELECT id FROM students WHERE matric_number = ?', (matric_number,))
        if not c.fetchone():
            conn.close()
            return jsonify({'success': False, 'error': 'Student not found'}), 404
        
        # Delete attendance records first (foreign key constraint)
        c.execute('DELETE FROM attendance_records WHERE matric_number = ?', (matric_number,))
        
        # Delete student
        c.execute('DELETE FROM students WHERE matric_number = ?', (matric_number,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Student deleted successfully'})
        
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({'success': False, 'error': str(e)}), 500

# ==================== ATTENDANCE API ====================

@app.route('/api/attendance', methods=['GET', 'POST'])
def handle_attendance():
    if request.method == 'GET':
        return get_attendance_data()
    elif request.method == 'POST':
        return record_attendance()

def get_attendance_data():
    """Get all attendance data with filtering options"""
    date_filter = request.args.get('date')
    matric_filter = request.args.get('matric_number')
    
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    query = '''
        SELECT ar.matric_number, ar.name, ar.date, ar.timestamp, ar.marks_earned,
               s.department, s.level
        FROM attendance_records ar
        LEFT JOIN students s ON ar.matric_number = s.matric_number
    '''
    
    params = []
    conditions = []
    
    if date_filter:
        conditions.append('ar.date = ?')
        params.append(date_filter)
    
    if matric_filter:
        conditions.append('ar.matric_number = ?')
        params.append(matric_filter)
    
    if conditions:
        query += ' WHERE ' + ' AND '.join(conditions)
    
    query += ' ORDER BY ar.timestamp DESC'
    
    c.execute(query, params)
    records = c.fetchall()
    conn.close()
    
    attendance_data = []
    for record in records:
        attendance_data.append({
            'matricNumber': record[0],
            'name': record[1],
            'date': record[2],
            'timestamp': record[3],
            'marksEarned': record[4],
            'department': record[5],
            'level': record[6]
        })
    
    return jsonify(attendance_data)

def record_attendance():
    """Record student attendance"""
    data = request.json
    
    required_fields = ['matricNumber', 'name']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'success': False, 'error': f'Missing required field: {field}'}), 400
    
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    try:
        # Check if student exists
        c.execute('SELECT id FROM students WHERE matric_number = ?', (data['matricNumber'],))
        student = c.fetchone()
        
        if not student:
            conn.close()
            return jsonify({'success': False, 'error': 'Student not registered'}), 400
        
        # Check if already attended today
        today = datetime.now().strftime('%Y-%m-%d')
        c.execute('''
            SELECT id FROM attendance_records 
            WHERE matric_number = ? AND date = ?
        ''', (data['matricNumber'], today))
        
        existing_attendance = c.fetchone()
        
        if existing_attendance:
            conn.close()
            return jsonify({
                'success': True, 
                'message': 'Attendance already recorded today',
                'attendanceRecorded': False
            })
        
        # Record attendance
        current_time = datetime.now().isoformat()
        c.execute('''
            INSERT INTO attendance_records 
            (matric_number, name, date, timestamp, marks_earned)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            data['matricNumber'],
            data['name'],
            today,
            current_time,
            data.get('marksEarned', 1)
        ))
        
        # Update student's marks and attendance count
        c.execute('''
            UPDATE students 
            SET total_marks = total_marks + ?, 
                attendance_count = attendance_count + 1,
                last_updated = ?
            WHERE matric_number = ?
        ''', (data.get('marksEarned', 1), current_time, data['matricNumber']))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True, 
            'message': 'Attendance recorded successfully',
            'attendanceRecorded': True,
            'marksAwarded': data.get('marksEarned', 1)
        })
        
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({'success': False, 'error': str(e)}), 500

# ==================== STATISTICS API ====================

@app.route('/api/statistics')
def get_statistics():
    """Get system statistics"""
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    # Total students
    c.execute('SELECT COUNT(*) FROM students')
    total_students = c.fetchone()[0]
    
    # Today's attendance
    today = datetime.now().strftime('%Y-%m-%d')
    c.execute('SELECT COUNT(DISTINCT matric_number) FROM attendance_records WHERE date = ?', (today,))
    present_today = c.fetchone()[0]
    
    # Total marks distributed
    c.execute('SELECT SUM(total_marks) FROM students')
    total_marks = c.fetchone()[0] or 0
    
    # Attendance rate
    attendance_rate = (present_today / total_students * 100) if total_students > 0 else 0
    
    # Recent activity (last 7 days)
    c.execute('''
        SELECT date, COUNT(DISTINCT matric_number) as daily_attendance
        FROM attendance_records 
        WHERE date >= date('now', '-7 days')
        GROUP BY date 
        ORDER BY date DESC
    ''')
    
    recent_activity = c.fetchall()
    
    conn.close()
    
    return jsonify({
        'totalStudents': total_students,
        'presentToday': present_today,
        'totalMarks': total_marks,
        'attendanceRate': round(attendance_rate, 1),
        'recentActivity': [
            {'date': record[0], 'attendance': record[1]} for record in recent_activity
        ]
    })

# ==================== DATA EXPORT API ====================

@app.route('/api/export')
def export_data():
    """Export all data as JSON"""
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    # Get all students
    c.execute('SELECT * FROM students')
    students = c.fetchall()
    
    # Get all attendance records
    c.execute('SELECT * FROM attendance_records')
    attendance_records = c.fetchall()
    
    conn.close()
    
    export_data = {
        'exportDate': datetime.now().isoformat(),
        'students': [
            {
                'id': student[0],
                'name': student[1],
                'matricNumber': student[2],
                'department': student[3],
                'level': student[4],
                'email': student[5],
                'phone': student[6],
                'totalMarks': student[7],
                'attendanceCount': student[8],
                'registeredAt': student[9],
                'lastUpdated': student[10]
            } for student in students
        ],
        'attendanceRecords': [
            {
                'id': record[0],
                'matricNumber': record[1],
                'name': record[2],
                'date': record[3],
                'timestamp': record[4],
                'marksEarned': record[5]
            } for record in attendance_records
        ]
    }
    
    return jsonify(export_data)

# ==================== SYNC API ====================

@app.route('/api/sync', methods=['POST'])
def sync_data():
    """Sync data from frontend to backend"""
    data = request.json
    
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    try:
        # Sync students
        for student in data.get('students', []):
            c.execute('''
                INSERT OR REPLACE INTO students 
                (id, name, matric_number, department, level, email, phone, 
                 total_marks, attendance_count, registered_at, last_updated)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                student.get('id'),
                student.get('name'),
                student.get('matricNumber'),
                student.get('department'),
                student.get('level'),
                student.get('email', ''),
                student.get('phone', ''),
                student.get('totalMarks', 0),
                student.get('attendanceCount', 0),
                student.get('registeredAt', datetime.now().isoformat()),
                datetime.now().isoformat()
            ))
        
        # Sync attendance records
        for record in data.get('attendanceRecords', []):
            c.execute('''
                INSERT OR REPLACE INTO attendance_records 
                (matric_number, name, date, timestamp, marks_earned)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                record.get('matricNumber'),
                record.get('name'),
                record.get('date'),
                record.get('timestamp'),
                record.get('marksEarned', 1)
            ))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Data synced successfully'})
        
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({'success': False, 'error': str(e)}), 500

# Error handler
@app.errorhandler(404)
def not_found(error):
    return jsonify({'success': False, 'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'success': False, 'error': 'Internal server error'}), 500

if __name__ == '__main__':
    init_db()
    print("🎓 Student Attendance System starting on http://localhost:5000")
    print("📊 Admin Dashboard: http://localhost:5000")
    print("🔧 API endpoints available:")
    print("   GET  /api/students - Get all students")
    print("   POST /api/students - Register new student")
    print("   POST /api/attendance - Record attendance")
    print("   GET  /api/statistics - Get system stats")
    print("   GET  /api/export - Export all data")
    app.run(debug=True, host='0.0.0.0', port=5000)