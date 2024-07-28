const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    email: { type: String,required: true},
    is_confirmed: { type: Boolean}
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = {
    Participant,
    participantSchema,
};
