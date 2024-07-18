const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: { type: String },
    occurs_at: { type: Date, required: true },
    description: { type: String },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = {
    Activity,
    activitySchema,
};
