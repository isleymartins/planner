const mongoose = require('mongoose');
const { activitySchema } = require('./Activity'); // Use o esquema

const activitiesSchema = new mongoose.Schema({
  tripId: { type: String, required: true },
  date: { type: Date, required: true },
  activities: [activitySchema], // Use o esquema aqui
});

const Activities = mongoose.model('Activities', activitiesSchema);

module.exports = {
  Activities,
  activitiesSchema,
};
