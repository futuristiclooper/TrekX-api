import mongoose from 'mongoose';

const labReportSchema = new mongoose.Schema({
  patientId: String,
  reportType: String,
  findings: String,
  date: Date
});

const LabReport = mongoose.model('LabReport', labReportSchema);

// Remove connectMongo function as connection is handled in index.js
export const getLabReportsByPatientId = async (patientId) => {
  return LabReport.find({ patientId });
};

export const addLabReport = async (report) => {
  const newReport = new LabReport(report);
  return newReport.save();
};
