const supabase = require('../services/supabaseClient');

// Add a new lead
exports.addLead = async (req, res) => {
  const { name, status, contacts } = req.body;

  try {
    // Insert the lead
    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert([{ name, status }])
      .select();

    if (leadError) throw leadError;

    // Insert contacts for the lead
    if (contacts && contacts.length > 0) {
      const contactPromises = contacts.map(contact =>
        supabase.from('contacts').insert([{ ...contact, lead_id: leadData[0].id }])
      );
      await Promise.all(contactPromises);
    }

    res.status(201).json({ success: true, lead: leadData[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all leads
exports.getLeads = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*, contacts(*)');
    if (error) throw error;

    res.status(200).json({ success: true, leads: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a specific lead by ID
exports.getLeadById = async (req, res) => {
  const { id } = req.params;
  console.log(id, req)

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*, contacts(*)')
      .eq('id', id);
    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.status(200).json({ success: true, lead: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a lead
exports.deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete associated contacts first to maintain referential integrity
    const { error: contactsError } = await supabase
      .from('contacts')
      .delete()
      .eq('lead_id', id);

    if (contactsError) throw contactsError;

    // Delete the lead
    const { error: leadError } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (leadError) throw leadError;

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

