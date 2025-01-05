import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const api = {
  getLeads: async () => {
    const response = await axios.get(`${BASE_URL}/leads`);
    return response.data;
  },

  getLeadDetails: async (leadId) => {
    const response = await axios.get(`${BASE_URL}/leads/${leadId}`);
    return response.data;
  },

  addLead: async (lead) => {
    const response = await axios.post(`${BASE_URL}/leads`, lead);
    return response.data;
  },

  deleteLead: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/leads/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  },

  getInteractions: async (leadId) => {
    const response = await axios.get(`${BASE_URL}/leads/${leadId}/interactions`);
    return response.data;
  },

  addInteraction: async (interaction) => {
    const response = await axios.post(`${BASE_URL}/interactions`, interaction);
    return response.data;
  }
};

export default api;
