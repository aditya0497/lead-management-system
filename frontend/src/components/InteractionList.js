import React, { useEffect, useState } from 'react';
import api from '../services/api';

function InteractionList({ leadId }) {
  const [interactions, setInteractions] = useState([]);  // Initialize as empty array

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const data = await api.getInteractions(leadId);
        
        setInteractions(data.interactions || []);
      } catch (error) {
        console.error('Error fetching interactions:', error);
        setInteractions([]);  // Set to empty array if there's an error
      }
    };

    fetchInteractions();
  }, [leadId]);

  return (
    <div>
      <h3>Interactions</h3>
      {interactions.length === 0 ? (
        <p>No interactions found.</p>
      ) : (
        <ul>
          {interactions.map((interaction) => (
            <li key={interaction.id}>
              <p><strong>Type:</strong> {interaction.type}</p>
              <p><strong>Date:</strong> {interaction.interaction_date}</p>
              <p><strong>Details:</strong> {interaction.details}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InteractionList;
