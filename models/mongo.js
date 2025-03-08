import mongoose from 'mongoose';
import 'dotenv/config';

const labReportSchema = new mongoose.Schema({
  patientId: String,
  reportType: String,
  findings: String,
  date: Date
});

const LabReport = mongoose.model('LabReport', labReportSchema);

async function connectMongo() {
  await mongoose.connect(process.env.MONGO_URI);
}

async function fetchMongoData(collection, query) {
  return LabReport.find(query);
}

export { connectMongo, fetchMongoData };
