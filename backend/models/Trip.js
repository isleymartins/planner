const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  starts_at: { type: Date, required: true },
  ends_at: { type: Date, required: true },
  emails_to_invite: { type: [String], required: true },
  owner_name: { type: String, required: true },
  owner_email: { type: String, required: true }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = {
  Trip,
  tripSchema,
};
