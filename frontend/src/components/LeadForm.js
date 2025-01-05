import React, { useState } from 'react';
import api from '../services/api';
import './LeadForm.css';

function LeadForm({ onAddLead }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('New');
  const [contacts, setContacts] = useState([]);

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLead = { name, status, contacts };

    try {
      const response = await api.addLead(newLead);
      if (response.success) {
        onAddLead(response.lead);
      }
    } catch (error) {
      console.error('Error adding lead:', error);
    }

    setName('');
    setStatus('New');
    setContacts([]);
  };

  const addContact = () => {
    setContacts([...contacts, { name: '', role: '', phone: '', email: '' }]);
  };

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Add New Lead</h3>
      
      <div className="form-group">
        <label htmlFor="name">Lead Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter Lead Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Converted">Converted</option>
        </select>
      </div>

      <div className="contacts">
        <h4>Contacts</h4>
        {contacts.map((contact, index) => (
          <div key={index} className="contact-form-group">
            <label>Contact {index + 1}</label>
            <div className="contact-fields">
              <input
                type="text"
                placeholder="Contact Name"
                value={contact.name}
                onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={contact.role}
                onChange={(e) => handleContactChange(index, 'role', e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone"
                value={contact.phone}
                onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={contact.email}
                onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addContact} className="add-contact-btn">
          Add Contact
        </button>
      </div>

      <button type="submit" className="submit-btn">Add Lead</button>
    </form>
  );
}

export default LeadForm;
