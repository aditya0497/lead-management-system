import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import "./LeadList.css";

function LeadList({ leads, onDeleteLead }) {
  const handleDelete = async (id) => {
    try {
      const response = await api.deleteLead(id);
      if (response.success) {
        
        onDeleteLead(id);
      } else {
        alert('Failed to delete lead');
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  return (
    <div>
      <h3>Lead List</h3>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id} className="lead-item">
            <div className="lead-info">
              <Link to={`/leads/${lead.id}`} className="lead-name">{lead.name}</Link>
              <p>Status: {lead.status}</p>
            </div>
            <button
              onClick={() => handleDelete(lead.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeadList;
