const supabase = require('../services/supabaseClient');

// Add an interaction
exports.addInteraction = async (req, res) => {
  const { lead_id, type, details, interaction_date } = req.body;

  try {
    const { data, error } = await supabase
      .from('interactions')
      .insert([{ lead_id, type, details, interaction_date }])
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, interaction: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get interactions for a lead
exports.getInteractions = async (req, res) => {
  const { leadId } = req.params;

  try {
    const { data, error } = await supabase
      .from('interactions')
      .select('*')
      .eq('lead_id', leadId);
    if (error) throw error;

    res.status(200).json({ success: true, interactions: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
