import React, { useState } from 'react';
import api from '../services/api';

function InteractionForm({ leadId, onAddInteraction, closeForm }) {
  const [type, setType] = useState('Call');
  const [details, setDetails] = useState('');
  const [interactionDate, setInteractionDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInteraction = {
      lead_id: leadId,
      type,
      details,
      interaction_date: interactionDate,
    };

    try {
      const response = await api.addInteraction(newInteraction);
      if (response.success) {
        onAddInteraction(response.interaction);
        closeForm();
      }
    } catch (error) {
      console.error('Error adding interaction:', error);
    }

    setType('Call');
    setDetails('');
    setInteractionDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Interaction</h3>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Call">Call</option>
        <option value="Order">Order</option>
        <option value="Note">Note</option>
      </select>

      <textarea
        placeholder="Interaction Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
      />

      <input
        type="date"
        value={interactionDate}
        onChange={(e) => setInteractionDate(e.target.value)}
        required
      />

      <button type="submit">Add Interaction</button>
    </form>
  );
}

export default InteractionForm;
