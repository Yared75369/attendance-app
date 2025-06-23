import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

// Inside JSX
<button onClick={() => {
  const ws = XLSX.utils.aoa_to_sheet(csvData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Attendance");
  XLSX.writeFile(wb, "Attendance.xlsx");
}}>Export to Excel</button>

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const res = await axios.get('http://localhost:5000/api/attendance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    };
    fetchReports();
  }, [token]);

  const csvData = [
    ['Date', 'Class', 'Teacher', 'Student', 'Status'],
    ...reports.flatMap((r) =>
      r.records.map((rec) => [
        new Date(r.date).toLocaleDateString(),
        r.class,
        r.teacher.name,
        rec.student.name,
        rec.status,
      ])
    ),
  ];

  return (
    <div>
      <h2>Admin Dashboard - Attendance Reports</h2>
      <CSVLink data={csvData} filename={"attendance.csv"}>
        Export to CSV
      </CSVLink>
      <br />
      <br />
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Class</th>
            <th>Teacher</th>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) =>
            r.records.map((rec, i) => (
              <tr key={i}>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.class}</td>
                <td>{r.teacher.name}</td>
                <td>{rec.student.name}</td>
                <td>{rec.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <br />
      <button onClick={() => navigate('/')}>Logout</button>
    </div>
  );
};

export default AdminDashboard;