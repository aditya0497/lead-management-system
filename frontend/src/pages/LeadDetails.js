import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import InteractionForm from '../components/InteractionForm';
import InteractionList from '../components/InteractionList';
import "./LeadDetails.css";

function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null); 
  const [showInteractionForm, setShowInteractionForm] = useState(false); 

  useEffect(() => {
    const fetchLead = async () => {
      const data = await api.getLeadDetails(id);
      setLead(data.lead);
    };
    fetchLead();
  }, [id]);

  const handleAddInteraction = (newInteraction) => {
    setLead((prevLead) => ({
      ...prevLead,
      interactions: [
        ...(prevLead.interactions || []), 
        newInteraction,
      ],
    }));
  };
  

  const toggleInteractionForm = () => {
    setShowInteractionForm((previousValue) => !previousValue); 
  };

  if (!lead) return <div>Loading...</div>;  

  return (
    <div>
      <h3>Lead Details</h3>
      <h4>{lead.name}</h4>
      <p>Status: {lead.status}</p>

      <h5>Contacts</h5>
      {Array.isArray(lead.contacts) && lead.contacts.length > 0 ? (
        lead.contacts.map((contact, index) => (
          <div key={index}>
            <p>Name: {contact.name}</p>
            <p>Role: {contact.role}</p>
            <p>Phone: {contact.contact_info.phone}</p>
            <p>Email: {contact.contact_info.email}</p>
          </div>
        ))
      ) : (
        <p>No contacts available.</p>
      )}

      <button onClick={toggleInteractionForm}>
        {showInteractionForm ? 'Cancel' : 'Add Interaction'}
      </button>

      {showInteractionForm && (
        <div className="modal-overlay">
          <div className={`modal-content ${showInteractionForm ? 'show' : ''}`}>
            <button className="modal-close" onClick={toggleInteractionForm}>
              ×
            </button>

            <InteractionForm leadId={id} onAddInteraction={handleAddInteraction} closeForm={toggleInteractionForm} />
          </div>
        </div>
      )}

      <InteractionList leadId={id} />
    </div>
  );
}

export default LeadDetails;
