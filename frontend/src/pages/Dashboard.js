import React, { useState } from 'react';
import LeadForm from '../components/LeadForm';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="actions">
        <button className="btn-primary" onClick={handleToggleForm}>
          {showForm ? 'Close Add Lead Form' : 'Add New Lead'}
        </button>
        <Link to="/leads" className="btn-secondary">
          Go to Lead List
        </Link>
      </div>
      {showForm && <LeadForm />}
    </div>
  );
}

export default Dashboard;
