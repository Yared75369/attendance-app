import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get('http://localhost:5000/api/students/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);

      // Initialize attendance state
      const initial = {};
      res.data.forEach((s) => {
        initial[s._id] = 'Present'; // Default status
      });
      setAttendance(initial);
    };
    fetchStudents();
  }, [token]);

  const handleChange = (id, status) => {
    setAttendance({ ...attendance, [id]: status });
  };

  const handleSubmit = async () => {
    const data = Object.entries(attendance).map(([studentId, status]) => ({
      student: studentId,
      status,
    }));

    await axios.post(
      'http://localhost:5000/api/attendance',
      { records: data },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert('Attendance submitted!');
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>
                <select
                  value={attendance[s._id]}
                  onChange={(e) => handleChange(s._id, e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={handleSubmit}>Submit Attendance</button>
      <br />
      <button onClick={() => navigate('/')}>Logout</button>
    </div>
  );
};

export default Dashboard;