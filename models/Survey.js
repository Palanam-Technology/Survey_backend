//This is the model for the SurveyForm data
const mongoose = require('mongoose');
const surveySchema = new mongoose.Schema({
  fullName: String,
  gender: { type: String, enum: ['male', 'female'] },
  age: Number,
  address: String,
  country: String,         
  state: String,
  hasChildren: String,
  childrenCount: Number,
  childrenAge: Number,
  kidsUseTech: String,
  devicesUsed: [String],
  otherDevices: String,
  screenTime: Number,
  usagePurpose: [String],
  otherUsagePurpose: String,
  troubledByUsage: String,
  usingMeasures: String,
  measureDetails: String,
  concerns: [String],
  otherConcerns: String,
  solution: {type: String},
  expectations: [String],
  otherExpectations: String,
}, { timestamps: true });

module.exports = mongoose.model('Survey', surveySchema);
