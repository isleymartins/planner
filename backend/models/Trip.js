const mongoose = require('mongoose');
const { participantSchema } = require('./Participant');

const tripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  starts_at: { type: Date, required: true },
  ends_at: { type: Date, required: true },
  emails_to_invite: [participantSchema],
  owner_email: { type: String, required: true }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = {
  Trip,
  tripSchema,
};
