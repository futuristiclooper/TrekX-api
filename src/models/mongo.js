import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

const labReportSchema = new mongoose.Schema({
  patientId: String,
  reportType: String,
  findings: String,
  date: Date
});

const LabReport = mongoose.model('LabReport', labReportSchema);

export const getLabReportsByPatientId = async (patientId) => {
  return LabReport.find({ patientId });
};

export const addLabReport = async (report) => {
  const newReport = new LabReport(report);
  return newReport.save();
};

export default { connectMongo, getLabReportsByPatientId, addLabReport };