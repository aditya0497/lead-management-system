import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LeadList from './components/LeadList';
import LeadDetails from './pages/LeadDetails';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import api from './services/api';
import './index.css';

function App() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const data = await api.getLeads();
    setLeads(data.leads);
  };

  const handleDeleteLead = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <Router>
      <div className="App">
        <h1 className="app-title">Lead Management System</h1>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/leads" render={() => <LeadList leads={leads} onDeleteLead={handleDeleteLead}/>} />
          <Route path="/leads/:id" component={LeadDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
